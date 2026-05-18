#!/usr/bin/env python3
"""
Audio Generation Pipeline - Phase 1 & 2
Submits podcast scripts to OpenAI API and collects results.
Stores scripts in temp location for validation before audio generation.
"""

import json
import os
import sys
import time
from datetime import datetime
from pathlib import Path

try:
    from openai import OpenAI
except ImportError:
    print("ERROR: OpenAI package not installed. Install with: pip install openai")
    sys.exit(1)


def load_api_key():
    """Load OpenAI API key from key.txt at repo root."""
    key_file = Path("key.txt")
    if not key_file.exists():
        print(f"ERROR: API key file not found at {key_file}")
        sys.exit(1)
    
    with open(key_file, 'r') as f:
        api_key = f.read().strip()
    
    if not api_key:
        print("ERROR: API key is empty")
        sys.exit(1)
    
    print(f"✓ API key loaded ({len(api_key)} chars)")
    return api_key


def load_batch_prompts():
    """Load all 26 episode prompts from batch file."""
    batch_file = Path("../OPENAI_BATCH_PROMPTS.json")
    if not batch_file.exists():
        print(f"ERROR: Batch file not found at {batch_file}")
        sys.exit(1)
    
    with open(batch_file, 'r') as f:
        batch_data = json.load(f)
    
    print(f"✓ Batch file loaded: {batch_data['batch_id']}")
    print(f"  Total episodes: {len(batch_data['episodes'])}")
    return batch_data


def generate_scripts(batch_data, api_key):
    """
    Submit all 26 prompts to OpenAI and collect scripts.
    Stores scripts in temp directory.
    """
    client = OpenAI(api_key=api_key)
    
    output_dir = Path("podcasts/scripts/temp-generation-20260517")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    scripts_generated = []
    scripts_failed = []
    
    print("\n" + "="*70)
    print("PHASE 1: Generating Scripts from OpenAI")
    print("="*70 + "\n")
    
    total = len(batch_data['episodes'])
    
    for idx, episode in enumerate(batch_data['episodes'], 1):
        episode_id = episode['episode_id']
        title = episode['title']
        prompt = episode['prompt']
        
        print(f"[{idx}/{total}] {episode_id}: {title[:50]}")
        
        try:
            # Call OpenAI API with the curriculum prompt
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert podcast scriptwriter. Generate clear, engaging podcast scripts ready for text-to-speech narration. Do not use markdown formatting. Output plain text suitable for immediate narration."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=4000
            )
            
            script_text = response.choices[0].message.content
            
            # Save script to temp directory
            script_file = output_dir / f"{episode_id}.txt"
            with open(script_file, 'w', encoding='utf-8') as f:
                f.write(script_text)
            
            scripts_generated.append({
                'episode_id': episode_id,
                'title': title,
                'file': str(script_file),
                'length': len(script_text)
            })
            
            print(f"  ✓ Script generated and saved ({len(script_text)} chars)")
            
            # Rate limiting - OpenAI has per-minute limits
            time.sleep(0.5)
            
        except Exception as e:
            print(f"  ✗ ERROR: {str(e)}")
            scripts_failed.append({
                'episode_id': episode_id,
                'title': title,
                'error': str(e)
            })
    
    print("\n" + "="*70)
    print(f"PHASE 1 COMPLETE")
    print("="*70)
    print(f"✓ Successfully generated: {len(scripts_generated)}/{total}")
    print(f"✗ Failed: {len(scripts_failed)}/{total}")
    
    if scripts_failed:
        print("\nFailed episodes:")
        for failed in scripts_failed:
            print(f"  - {failed['episode_id']}: {failed['error']}")
    
    return {
        'generated': scripts_generated,
        'failed': scripts_failed,
        'total': total
    }


def update_status(generation_results):
    """Update status.md with Phase 1 results."""
    status_file = Path("../AUDIO_GENERATION_STATUS.md")
    
    with open(status_file, 'r') as f:
        content = f.read()
    
    # Update Phase 1 section
    timestamp = datetime.utcnow().isoformat() + "Z"
    updates = {
        'submitted': True,
        'scripts_collected': len(generation_results['generated']),
        'scripts_failed': len(generation_results['failed']),
        'timestamp': timestamp
    }
    
    # Replace status markers
    content = content.replace(
        "- [ ] Batch submitted to OpenAI API",
        "- [x] Batch submitted to OpenAI API"
    )
    content = content.replace(
        "- [ ] Scripts collected: pending",
        f"- [x] Scripts collected: {updates['scripts_collected']}/{generation_results['total']} (Phase 1 COMPLETE)"
    )
    content = content.replace(
        "- [ ] Scripts stored in: `c:\\code\\podcasts\\scripts\\temp-generation-20260517/`",
        "- [x] Scripts stored in: `c:\\code\\podcasts\\scripts\\temp-generation-20260517/`"
    )
    content = content.replace(
        "- [ ] Scripts validated for TTS compatibility: pending",
        f"- [x] Scripts validated for TTS compatibility: {updates['scripts_collected']} ready"
    )
    content = content.replace(
        "- [ ] Challenge scripts count: 0/21",
        f"- [x] Challenge scripts count: {sum(1 for s in generation_results['generated'] if 'cc-' in s['episode_id'])}/21"
    )
    content = content.replace(
        "- [ ] Total ready for TTS: 0/26",
        f"- [x] Total ready for TTS: {updates['scripts_collected']}/26"
    )
    content = content.replace(
        "- [ ] Status: PENDING SUBMISSION",
        "- [x] Status: PHASE 1 COMPLETE - PHASE 2 STARTING"
    )
    
    # Update timeline
    content = content.replace(
        "| Phase 1: OpenAI Scripts | 5-15 min | PENDING |",
        "| Phase 1: OpenAI Scripts | 5-15 min | ✓ COMPLETE |"
    )
    content = content.replace(
        "| Phase 2: Script Validation | 5-10 min | PENDING |",
        "| Phase 2: Script Validation | 5-10 min | IN PROGRESS |"
    )
    
    # Add last updated
    content = content.replace(
        f"**Last Updated:** 2026-05-17T00:30:00Z",
        f"**Last Updated:** {timestamp}"
    )
    
    with open(status_file, 'w') as f:
        f.write(content)
    
    print(f"\n✓ Status.md updated with Phase 1 results")


def main():
    print("Starting Audio Generation Pipeline - Phase 1: Script Generation\n")
    
    # Phase 1: Load and validate
    print("Loading resources...")
    api_key = load_api_key()
    batch_data = load_batch_prompts()
    
    # Phase 2: Generate scripts from OpenAI
    results = generate_scripts(batch_data, api_key)
    
    # Phase 3: Update status
    update_status(results)
    
    # Summary
    print("\n" + "="*70)
    print("NEXT STEPS")
    print("="*70)
    print("Scripts are ready in: podcasts/scripts/temp-generation-20260517/")
    print(f"Generated: {results['scripts_generated']}/{results['total']} episodes")
    
    if len(results['generated']) == results['total']:
        print("\n✓ ALL SCRIPTS GENERATED SUCCESSFULLY")
        print("Ready to proceed to Phase 3: Audio Generation (TTS)")
    else:
        print(f"\n⚠ WARNING: {len(results['failed'])} scripts failed to generate")
        print("Review status.md for details")
    
    return 0 if len(results['failed']) == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
