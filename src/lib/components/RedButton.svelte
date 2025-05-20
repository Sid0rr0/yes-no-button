<script lang="ts">
	let props = $props()
</script>

<button class="button" {...props}>
    <!--  -->
  </button>

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