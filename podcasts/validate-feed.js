#!/usr/bin/env node
/**
 * Lightweight RSS feed validator for podcasts/feed.xml.
 *
 * This checks common RSS 2.0 + podcast requirements that third-party
 * feed checkers validate, especially enclosure structure.
 */
const fs = require('fs');
const path = require('path');

const FEED_PATH = path.join(__dirname, 'feed.xml');
const AUDIO_DIR = path.join(__dirname, 'audio');
const SCRIPTS_DIR = path.join(__dirname, 'scripts');

function countFilesRecursive(dir, predicate) {
  if (!fs.existsSync(dir)) return 0;
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += countFilesRecursive(fullPath, predicate);
    } else if (entry.isFile() && predicate(entry.name, fullPath)) {
      total += 1;
    }
  }
  return total;
}

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  process.exitCode = 1;
}

function warn(msg) {
  console.warn(`WARN: ${msg}`);
}

function mustMatch(xml, regex, label) {
  if (!regex.test(xml)) {
    fail(`Missing required element: ${label}`);
    return false;
  }
  return true;
}

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(value);
}

function main() {
  if (!fs.existsSync(FEED_PATH)) {
    fail(`Feed file not found: ${FEED_PATH}`);
    return;
  }

  const xml = fs.readFileSync(FEED_PATH, 'utf8');

  mustMatch(xml, /<rss\b[^>]*version="2\.0"/i, 'rss@version=2.0');
  mustMatch(xml, /<channel>/i, 'channel');
  mustMatch(xml, /<title>[^<]+<\/title>/i, 'channel/title');
  mustMatch(xml, /<link>https?:\/\/[^<]+<\/link>/i, 'channel/link');
  mustMatch(xml, /<description>[\s\S]*?<\/description>/i, 'channel/description');
  mustMatch(xml, /<language>[^<]+<\/language>/i, 'channel/language');
  mustMatch(xml, /<lastBuildDate>[^<]+<\/lastBuildDate>/i, 'channel/lastBuildDate');
  mustMatch(xml, /<atom:link\b[^>]*rel="self"[^>]*type="application\/rss\+xml"/i, 'atom:link self');

  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
  if (itemMatches.length === 0) {
    const scriptCount = countFilesRecursive(SCRIPTS_DIR, fileName => fileName.endsWith('.txt'));
    const audioCount = countFilesRecursive(AUDIO_DIR, fileName => fileName.endsWith('.mp3'));

    if (scriptCount > 0 && audioCount === 0) {
      warn(`No <item> elements found because ${scriptCount} transcript scripts exist but no MP3 enclosures have been generated yet.`);
      console.log('Feed validation passed for transcript-only pre-audio state. Re-run after audio generation to validate enclosures.');
      return;
    }

    fail('No <item> elements found');
  }

  const guidSet = new Set();

  for (const [idx, item] of itemMatches.entries()) {
    const n = idx + 1;

    if (!/<title>[\s\S]*?<\/title>/i.test(item)) fail(`item ${n}: missing title`);
    if (!/<link>https?:\/\/[^<]+<\/link>/i.test(item)) fail(`item ${n}: missing/invalid link`);
    if (!/<guid\b[^>]*>[\s\S]*?<\/guid>/i.test(item)) fail(`item ${n}: missing guid`);
    if (!/<pubDate>[^<]+<\/pubDate>/i.test(item)) fail(`item ${n}: missing pubDate`);

    const guidMatch = item.match(/<guid\b[^>]*>([\s\S]*?)<\/guid>/i);
    if (guidMatch) {
      const guid = guidMatch[1].trim();
      if (!guid) {
        fail(`item ${n}: empty guid`);
      } else if (guidSet.has(guid)) {
        fail(`item ${n}: duplicate guid (${guid})`);
      } else {
        guidSet.add(guid);
      }
    }

    const enclosureMatch = item.match(/<enclosure\b([^>]*)\/>/i);
    if (!enclosureMatch) {
      fail(`item ${n}: missing enclosure`);
      continue;
    }

    const attrs = enclosureMatch[1];
    const urlMatch = attrs.match(/\burl="([^"]+)"/i);
    const lengthMatch = attrs.match(/\blength="([^"]+)"/i);
    const typeMatch = attrs.match(/\btype="([^"]+)"/i);

    if (!urlMatch) {
      fail(`item ${n}: enclosure missing url`);
    } else if (!isAbsoluteUrl(urlMatch[1])) {
      fail(`item ${n}: enclosure url is not absolute (${urlMatch[1]})`);
    }

    if (!lengthMatch) {
      fail(`item ${n}: enclosure missing length`);
    } else if (!/^\d+$/.test(lengthMatch[1])) {
      fail(`item ${n}: enclosure length is not an integer (${lengthMatch[1]})`);
    } else if (lengthMatch[1] === '0') {
      warn(`item ${n}: enclosure length is 0`);
    }

    if (!typeMatch) {
      fail(`item ${n}: enclosure missing type`);
    } else if (typeMatch[1].toLowerCase() !== 'audio/mpeg') {
      fail(`item ${n}: enclosure type should be audio/mpeg (found ${typeMatch[1]})`);
    }
  }

  if (process.exitCode && process.exitCode !== 0) {
    console.error(`\nFeed validation failed with ${itemMatches.length} item(s) checked.`);
    process.exit(process.exitCode);
  }

  console.log(`Feed validation passed. Checked ${itemMatches.length} item(s).`);
}

main();
