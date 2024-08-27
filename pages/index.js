import { Header, Layout, Modal, Pagination, Table } from "@/components";

function Landing() {
	return (
		<Layout>
			<Header />
			<Table />
			<Pagination />
			<Modal />
		</Layout>
	);
}

export default Landing;


// pages/index.js is the entry point for the home page of your application. It renders the content that will be shown when users visit the root URL (/).

// Layout.js : defines a layout component used to wrap other components and apply consistent styling or structure across different pages. It uses {children} to render whatever content is passed to it.

