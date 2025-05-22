<script lang="ts">
	import ThemeSwitcher from '@/lib/components/ThemeSwitcher.svelte'
	import '../app.css'
	import { Button } from '@/lib/components/ui/button'
  import { Volume2, VolumeOff } from "@lucide/svelte"
	import { onMount, setContext } from 'svelte'
	import { writable } from 'svelte/store'

	let { children } = $props()
	let isMuted = writable(false)

	function toggleMute() {
		$isMuted = !$isMuted
		localStorage.setItem('isMuted', $isMuted ? 'true' : 'false')
	}

	onMount(() => {
		const storedMuteState = localStorage.getItem('isMuted')
		$isMuted = storedMuteState === 'true' ? true : false
	})

	setContext('isMuted', isMuted)
</script>

<nav class="flex justify-center items-center gap-4 p-2">
	<a href="/">Home</a>
	<a href="/data">Data</a>
	<a href="/about">About</a>
	<ThemeSwitcher />
	<Button variant="outline" size="icon" onclick={toggleMute}>
		{#if $isMuted} <VolumeOff />  
		{:else } <Volume2 /> 
		{/if}
	</Button>
	<!-- TODO lang switch? -->
</nav>

<main class="flex flex-col items-center flex-grow mx-6">
	{@render children()}
</main>

<!-- <footer class="w-full text-center pb-2">
	<p>© 2025 Yes/No button</p>
</footer> -->
