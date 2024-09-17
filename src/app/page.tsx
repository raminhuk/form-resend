import ContactForm from "./components/ContactForm";

export default function Home() {
	return (
		<div className="container mx-auto my-10 p-4 max-w-[500px]">
			<h1 className="text-2xl font-bold mb-4">Contato</h1>
			<ContactForm />
		</div>
	);
}
