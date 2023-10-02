<script>
	import '../app.postcss'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'

	export let data
</script>

<div class='container mx-auto sm:border-x sm:border-x-gray-100 max-w-7xl'>
	<Header authenticated={!!data.session?.user} />
	<slot />
	<Footer />
</div>
