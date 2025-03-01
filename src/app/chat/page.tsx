export default function ChatPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
			<h1 className="text-4xl font-bold text-emerald-800 mb-4">Welcome to Chat</h1>
			<p className="text-lg text-gray-600 mb-6">Start your AI-powered learning journey here!</p>

			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<div className="h-64 border border-gray-300 rounded-md p-4 overflow-y-auto">
					<p className="text-gray-500">Chat messages will appear here...</p>
				</div>

				<div className="mt-4 flex">
					<input
						type="text"
						placeholder="Type your message..."
						className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
					/>
					<button className="bg-emerald-600 text-white px-4 py-2 rounded-r-md hover:bg-emerald-700">
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
