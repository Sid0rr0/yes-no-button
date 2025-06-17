<script lang="ts">
  // import { Moon, Sun } from "@lucide/svelte"
  import Moon from "@lucide/svelte/icons/moon"
  import Sun from "@lucide/svelte/icons/sun"
  import { Button } from "$lib/components/ui/button/index.js"
  import { onMount } from 'svelte'

  let theme = $state("light")

	onMount(() => {
		const isDarkMode = document.documentElement.classList.contains('dark')
    theme = isDarkMode ? 'dark' : 'light'
	})

  $effect(() => {
    const isDark
      = theme === 'dark'
        || (theme === 'system'
          && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList[isDark ? 'add' : 'remove'] ('dark')
  })
  </script>

  <Button class="cursor-pointer" variant="outline" size="icon" onclick={() => {
    theme = theme === 'dark' ? 'light' : 'dark'
  }}>
  <Sun
  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Moon
  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
  </Button>
