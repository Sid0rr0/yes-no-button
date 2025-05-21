<script>
  import DecisionList from "@/lib/components/DecisionList.svelte";

</script>

<div class="flex flex-col items-center gap-4 w-full">
  <h1 class="text-2xl font-bold">History</h1>

  <DecisionList numberOfQuestions={100} />
</div>
