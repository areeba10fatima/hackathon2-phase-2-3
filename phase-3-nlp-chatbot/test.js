// Simple test script for the Task Management Chatbot
const TaskChatbot = require('./src/index');

console.log('🧪 Testing Task Management Chatbot...\n');

async function runTests() {
  const chatbot = TaskChatbot.create();

  // Test cases
  const testCases = [
    { input: 'Add task: Buy groceries', description: 'Adding a new task' },
    { input: 'Show my tasks', description: 'Listing all tasks' },
    { input: 'Complete task: Buy groceries', description: 'Completing a task' },
    { input: 'Delete task: Buy groceries', description: 'Deleting a task' },
    { input: 'help', description: 'Getting help' },
    { input: 'I need to finish the report', description: 'Alternative add task syntax' },
    { input: 'What\'s on my list?', description: 'Alternative list syntax' }
  ];

  for (const testCase of testCases) {
    console.log(`📝 ${testCase.description}:`);
    console.log(`💬 Input: "${testCase.input}"`);

    try {
      const response = await chatbot.processMessage(testCase.input);
      console.log(`🤖 Response: ${response.split('\n')[0]}...`); // Show first line of response
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }

    console.log('---');
  }

  console.log('\n✅ Tests completed!');
}

// Run the tests
runTests().catch(console.error);