// Command parser for natural language understanding
class CommandParser {
  constructor() {
    // Define patterns for different command intents
    this.patterns = {
      ADD_TASK: [
        /^add\s+(?:a\s+)?(?:task|todo):\s*(.+)$/i,
        /^create\s+(?:a\s+)?(?:task|todo)\s+(?:to|for)\s+(.+)$/i,
        /^i\s+need\s+to\s+(.+)$/i,
        /^don't\s+forget\s+to\s+(.+)$/i,
        /^(?:create|make|add)\s+(?:a\s+)?(?:task|todo)\s+(?:to|for)\s+(.+)$/i,
        /^schedule\s+(.+)$/i,
        /^remind\s+me\s+to\s+(.+)$/i
      ],
      DELETE_TASK: [
        /^delete\s+(?:task|the)?\s*:?\s*(.+)$/i,
        /^remove\s+(?:the\s+)?(.+)\s+(?:task|item)/i,
        /^cancel\s+(?:the\s+)?(.+)\s+(?:task|item)/i,
        /^delete\s+(?:the\s+)?(.+)/i,
        /^remove\s+(?:task\s+:?\s*)?(.+)$/i
      ],
      COMPLETE_TASK: [
        /^complete\s+(?:task|the)?\s*:?\s*(.+)$/i,
        /^mark\s+(?:task\s+:?\s*)?(.+)\s+as\s+done/i,
        /^finished\s+(?:with\s+)?(.+)/i,
        /^i\s+completed\s+(.+)/i,
        /^done\s+with\s+(.+)/i,
        /^finish\s+(?:the\s+)?(.+)/i,
        /^completed\s+(?:the\s+)?(.+)/i
      ],
      LIST_TASKS: [
        /^(?:show|list|display)\s+(?:my\s+)?(?:tasks|todos|to-dos)/i,
        /^what'?s\s+(?:on\s+)?(?:my\s+)?list/i,
        /^show\s+(?:me\s+)?(?:my\s+)?(?:tasks|todos)/i,
        /^what\s+(?:do\s+)?i\s+have\s+(?:to\s+)?do/i,
        /^list\s+(?:all\s+)?(?:tasks|todos)/i,
        /^(?:show|display)\s+(?:pending|completed)?\s*tasks/i,
        /^my\s+(?:tasks|todos)/i
      ],
      HELP: [
        /^help$/i,
        /^what\s+can\s+you\s+do/i,
        /^commands/i,
        /^instructions/i
      ]
    };
  }

  parse(message) {
    const trimmedMessage = message.trim();

    // Check each intent type
    for (const [intent, patterns] of Object.entries(this.patterns)) {
      for (const pattern of patterns) {
        const match = trimmedMessage.match(pattern);
        if (match) {
          const extractedText = match[1] ? match[1].trim() : '';

          // Determine the status for LIST_TASKS command
          let status = null;
          if (intent === 'LIST_TASKS') {
            if (trimmedMessage.toLowerCase().includes('pending')) {
              status = 'pending';
            } else if (trimmedMessage.toLowerCase().includes('completed')) {
              status = 'completed';
            }
          }

          return {
            intent,
            entities: {
              taskName: extractedText,
              taskTitle: extractedText,
              description: extractedText,
              status: status
            },
            originalMessage: trimmedMessage
          };
        }
      }
    }

    // If no pattern matched, return null
    return null;
  }
}

module.exports = CommandParser;