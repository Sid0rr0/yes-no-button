<script lang="ts">
	import ThemeSwitcher from '@/lib/components/ThemeSwitcher.svelte'
	import '../app.css'
	
	let { children } = $props()
</script>

<nav class="flex justify-center items-center gap-4 p-2">
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
	<ThemeSwitcher />
</nav>

<main class="flex flex-col items-center justify-center">
	{@render children()}
</main>

<footer class="absolute bottom-0 left-0 w-full text-center pb-2">
	<p>© 2025 Yes/No button</p>
</footer>
