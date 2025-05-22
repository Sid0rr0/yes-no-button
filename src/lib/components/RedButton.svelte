<script lang="ts">
	import { onMount } from "svelte"

	let props = $props()
	let audio: HTMLAudioElement | null = null

	function loadAudio() {
		audio = new Audio("/analog-appliance-button-7-185282.mp3")
		audio.volume = 0.7
		
	}

	function playAudio() {
		if (audio) {
			audio.currentTime = 0
			audio.play()
		}
	}

	function buttonClick(event: PointerEvent) {
		playAudio()
		props.onpointerdown?.(event)
	}

	onMount(() => {
		loadAudio()
	})

</script>

<button class="button" onpointerdown={buttonClick} >
	<!--  -->
</button>

<style>
@reference "tailwindcss";

.button{
  --press-time: 0.1s;
  --button-width: 220px;
  --button-height: 40px;

	box-shadow: 0px 5px 0 20px #4a3f3f, 0px 20px 0 30px #342f2f;

  @variant sm {
    --button-width: 300px;
  	--button-height: 50px;
  }

  @variant md {
    --button-width: 320px;
    --button-height: 60px;
		box-shadow: 0px 15px 0 20px #4a3f3f, 0px 40px 0 30px #342f2f;
  }

  @variant lg {
    --button-width: 400px;
    --button-height: 60px;
  }

	cursor: pointer;
	background-color: #c0392b;
	position: absolute;
  bottom: 13%;
  left: 50%;
	border-radius: 50%;
	width: var(--button-width);
	height: var(--button-height);
	transform: translateX(-50%);
	
	&::before{
		content: '';
		z-index: 1;
		border-radius: 50%;
		background-color: #e74c3c;
		position: absolute;
		bottom: 100%;
		left: 0%;
		transition: bottom var(--press-time);
		width: var(--button-width);
		height: var(--button-height);
	}

	&::after{
		content: '';
		background-color: #c0392b;
		position: absolute;
		bottom: 50%;
		left: 0%;
		width: var(--button-width);
		height: var(--button-height);
		transition: height var(--press-time);
	}

	&:active{
		&::before{ bottom: 10%; }
		&::after{ height: 10%; }
	}
}
</style>