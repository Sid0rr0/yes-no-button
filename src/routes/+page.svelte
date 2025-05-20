<div class="mt-8 w-full">
  <div class="flex flex-col items-center gap-4 w-full mt-16">
    <input type="range" min="1" max="100" class="w-1/2" bind:value={yes_prob} />
    <input type="number" min="1" max="100" bind:value={yes_prob}  class="py-2 px-4 border rounded text-center" />
  </div>

  {#if percentage >= 0}
    <div class="flex flex-col items-center my-10">
      <span>Result: {text}</span>
      <span>Percentage: {percentageText}</span>
    </div>
  {/if}


  <button class="button" onclick={getRandom}>
    <!--  -->
  </button>
</div>

<script lang="ts">
let yes_prob = $state(50)
let percentage = $state(-1)
let percentageText = $derived((percentage*100).toFixed(2)+"%")
let text = $derived(percentage >= yes_prob / 100 ? 'YES' : 'NO')

function getRandom() {
  percentage = Math.random()
}

</script>

<style>
@reference "tailwindcss";

.button{
  --press-time: 0.2s;
  --button-width: 300px;
  --button-height: 50px;

  @variant md {
    --button-width: 320px;
    --button-height: 60px;
  }

  @variant lg {
    --button-width: 480px;
    --button-height: 80px;
  }

  box-shadow: 0px 15px 0 20px #352d2d, 0px 40px 0 30px #000000;
	cursor: pointer;
	background-color: #c0392b;
	position: absolute;
  top: 75%;
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