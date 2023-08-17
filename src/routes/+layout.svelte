<script>
	import '../app.postcss'
	import Header from '../components/header.svelte'
	import Footer from '../components/footer.svelte'
</script>

<div class='container mx-auto sm:border-x sm:border-x-gray-100 max-w-7xl'>
	<Header />
	<slot />
	<Footer />
</div>
