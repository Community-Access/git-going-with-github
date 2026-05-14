/**
 * Build deterministic auto-responses for issue comments.
 * Kept pure so behavior is unit-testable.
 */

function getAutoResponse(commentBody, author) {
  const comment = (commentBody || '').toLowerCase();
  const safeAuthor = author || 'contributor';

  if (comment.includes('@aria-bot') || comment.includes('@gandalf-bot') || comment.includes('@bot help') || comment.includes('need help')) {
    return [
      `Hi @${safeAuthor}! I am Gandalf, your workshop agent. I bring a little magic to make this interaction experience clear, useful, and fun. I see you are looking for help, and that is exactly what I am here for. Here are some resources to get you unstuck:`,
      '',
      '**Guides:**',
      '- [Working with Pull Requests](../../docs/05-working-with-pull-requests.md)',
      '- [Merge Conflicts](../../docs/06-merge-conflicts.md)',
      '- [Culture and Etiquette](../../docs/07-culture-etiquette.md)',
      '',
      '**Common Issues:**',
      '- **Merge conflicts?** Check the [Merge Conflicts guide](../../docs/06-merge-conflicts.md)',
      '- **Need to update your PR?** Make changes on your branch and push again',
      '- **Validation failing?** Read the validation report above for specific fixes',
      '',
      '**Still stuck?** Mention `@facilitator` in a comment for human help!'
    ].join('\n');
  }

  if (comment.includes('merge conflict') || ((comment.includes('@aria-bot') || comment.includes('@gandalf-bot')) && comment.includes('conflict'))) {
    return [
      `Hi @${safeAuthor}! I am Gandalf. I see you want to learn about merge conflicts. They can seem intimidating at first, but resolving them is a normal developer skill. Let us walk through it together.`,
      '',
      '**Quick steps to resolve:**',
      '',
      '1. Go to the "Files changed" tab of your Pull Request',
      '2. Click "Resolve conflicts" button',
      '3. GitHub conflict editor will show you both versions',
      '4. Choose which lines to keep (remove the `<<<<<<<`, `=======`, `>>>>>>>` markers)',
      '5. Click "Mark as resolved"',
      '6. Commit the merge',
      '',
      '**Need detailed guidance?** See [Merge Conflicts Guide](../../docs/06-merge-conflicts.md)',
      '',
      '**For screen readers:** If conflict editing is difficult in the browser, use github.dev by pressing the `.` key on the repository page.'
    ].join('\n');
  }

  if ((comment.includes('@aria-bot') || comment.includes('@gandalf-bot')) && (comment.includes('check') || comment.includes('review'))) {
    return [
      `Hi @${safeAuthor}! Gandalf here. I see you want me to check your work.`,
      '',
      '- **If you are on an Issue:** Great job practice @mentions! Next, head to Challenge 4 to start branching.',
      '- **If you are on a Pull Request:** I am already scanning your changes! Look for my "Validation Report" above. If you do not see it, wait a few seconds and refresh.',
      '',
      'I am here to ensure our workspace remains accessible and inclusive for everyone. Keep up the great work!'
    ].join('\n');
  }

  if (comment.includes('how do i') && comment.includes('request review')) {
    return [
      `Hi @${safeAuthor}! Gandalf here. To request a review, use the reviewer controls on your pull request. Here is exactly how to do it:`,
      '',
      '1. On your PR page, find the "Reviewers" section in the right sidebar',
      '2. Click the gear icon next to "Reviewers"',
      '3. Start typing a facilitator or peer username',
      '4. Select them from the dropdown',
      '5. They will be notified automatically',
      '',
      '**Screen reader users:** The reviewers section is after the main PR description. Navigate to the complementary landmark and find "Reviewers".'
    ].join('\n');
  }

  return null;
}

module.exports = {
  getAutoResponse
};


