<div class="mt-2 w-full flex flex-col gap-4 items-center">
  <DecisionList numberOfQuestions={1} />

  <QuestionForm treshold={percentage} />
</div>

<script lang="ts">
  import QuestionForm from "$lib/components/QuestionForm.svelte"
  import { onMount } from 'svelte'
  import { db } from "@/db"
  import DecisionList from "@/lib/components/DecisionList.svelte"
  
  const INITIAL_TRESHOLD = 0.5

  let treshold = $state(INITIAL_TRESHOLD)
  let percentage = $derived(treshold * 100)

  onMount(async () => {
    const tresholdValue = await db.treshold.toArray()

    if (tresholdValue.length > 0) {
      treshold = tresholdValue[0].value
    } else {
      treshold = INITIAL_TRESHOLD
      await db.treshold.add({
        id: 1,
        value: INITIAL_TRESHOLD,
      })
    }
  })
</script>
