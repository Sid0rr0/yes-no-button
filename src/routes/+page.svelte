<div class="mt-8 w-full">
  <div class="flex flex-col items-center gap-4 w-full mt-16">
    <input type="range" min="1" max="100" class="w-1/2" bind:value={treshold} />
    <input type="number" min="1" max="100" bind:value={treshold}  class="py-2 px-4 border rounded text-center" />
  </div>

  <QuestionForm treshold={treshold} />
</div>

<script lang="ts">
  import QuestionForm from "$lib/components/QuestionForm.svelte"
  import { onMount } from 'svelte'
  import { db } from "@/db"
  // import { liveQuery } from "dexie"

  // let questions = liveQuery(
  //   () => db.questions.toArray()
  // )

  let treshold = $state(0.5)


  onMount(async () => {
    const tresholdValue = await db.treshold.toArray()

    if (tresholdValue.length > 0) {
      treshold = tresholdValue[0].value
      console.log(tresholdValue[0].value)
    } else {
      treshold = 0.5
      await db.treshold.add({
        id: 1,
        value: 0.5,
      })
    }
  })

</script>
