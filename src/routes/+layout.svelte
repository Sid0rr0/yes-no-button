<script lang="ts">
	import ThemeSwitcher from '@/lib/components/ThemeSwitcher.svelte'
	import '../app.css'
	
	let { children } = $props()
</script>

<nav class="flex justify-center items-center gap-4 p-2">
	<a href="/">Home</a>
	<a href="/history">History</a>
	<a href="/about">About</a>
	<ThemeSwitcher />
</nav>

<main class="flex flex-col items-center flex-grow mx-6">
	{@render children()}
</main>

<footer class="w-full text-center pb-2">
	<p>© 2025 Yes/No button</p>
</footer>
