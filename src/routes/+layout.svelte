<script>
	import '../app.postcss'
	import Header from '../components/Header.svelte'
	import Footer from '../components/Footer.svelte'
</script>

<div class='container mx-auto sm:border-x sm:border-x-gray-100 max-w-7xl'>
	<Header />
	<slot />
	<Footer />
</div>
