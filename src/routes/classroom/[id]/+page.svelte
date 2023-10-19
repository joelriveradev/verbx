<script lang='ts'>
  import '../../../app.postcss'

  import type { PageData } from './$types'
  import type { ChatGPTResponse } from '$lib/integrations/openAI/feedback'

  import CourseSection from '$lib/components/CourseSection.svelte'
  import ArrowRight from '$lib/components/icons/ArrowRight.svelte'
  import ArrowUp from '$lib/components/icons/ArrowUp.svelte'
  import ProgressRing from '$lib/components/ProgressRing.svelte'

  import { enhance } from '$app/forms'
  import { slide } from 'svelte/transition'
  import { quintInOut } from 'svelte/easing'
  import { animate } from 'motion'
  import { onMount } from 'svelte'

  export let data : PageData

  let isLoading   : boolean = false
  let answer      : string  = ''
  let disabled    : boolean
  let submitted   : boolean = false
  let response    : ChatGPTResponse | null
  let cnVerseOpen : boolean = true
  let commentariesOpen = true

  let titleRef: HTMLElement

  $: {
    isLoading,
    answer,
    disabled = !answer.trim() // .trim removes whitespaces
    submitted,
    response
  }

  onMount(() => {
    if(titleRef){
      animate(titleRef, { opacity: 1, }, { duration: 1 })
    }
  })

  const handleFormResult = (result: unknown) => {
    if(result) response = result as ChatGPTResponse
  }
</script>

<svelte:head>
  <title>{data.course.title}</title>
  <meta name='description' content={data.course.subtitle} />
</svelte:head>

<div class='flex items-start justify-between min-h-screen'>
  {#if data.activeModule}

    {@const {
      id,
      title,
      introduction,
      isCriticalthinking,
      question,
      verses,
      order,
      note,
      connectingVerses,
      commentaries
      } = data.activeModule
    }

    {@const src = (!isCriticalthinking ? '/book.svg': '/spark.svg')}
    {@const progress = data.progress}

    <div class='border-r border-r-gray-100 w-1/2 min-h-screen'>
      <header class='p-10 border-b border-b-gray-100'>
        <a class='text-xs text-gray-500 hover:underline flex items-center' href='/course/{data.course.id}'>
          <img class='w-4 mr-2' src='/arrow-left-xs.svg' aria-hidden alt='' />
          Overview
        </a>

        <h1 class='font-bold text-2xl mt-4'>
          {data.course.title}
        </h1>

        {#if progress}
          <div class='flex items-center mt-4'>
            <ProgressRing
              progress={progress}
              width={25}
              height={25}
              strokeWidth={2.5}
            />
            <small
              class='ml-2'
              class:text-emerald-400={data.complete}>
              {progress}% Complete
            </small>
          </div>
        {/if}
      </header>

      <nav class='h-full'>
        <ul>
          {#each data.course.sections as section, i}
            <li>
              <CourseSection
                sectionCompleted={Boolean(data?.complete) ?? false}
                activeModule={id}
                {section}
                handleModuleClick={() => {}}
                open={i === 0}
                padding
                showComplete
              />
            </li>
          {/each}
        </ul>
      </nav>
    </div>

    {#if data.complete}
      <div class='w-full'>
        <h1 class='font-normal text-lg m-10 mt-[73px] text-left'>
          Congrats, you've complete this course!
        </h1>
      </div>
    {/if}

    {#if !data.complete}
      <main class='opacity-0 w-3/4 h-full p-10' bind:this={titleRef}>
        <div class='max-w-xl'>
          <button
            class='text-xs flex items-center group'
            class:opacity-30={!submitted}
            class:cursor-not-allowed={disabled}
            disabled={disabled}
            on:click={() => {
            if(submitted){
              window.location.href = ''
            }
          }}>
            Next <ArrowRight classname='w-3 ml-1 group-hover:ml-2 transition-all' />
          </button>

          <!--Section Modules-->
          {#if introduction}
            <h1 class='font-semibold text-lg mt-5 mb-3'>{title}</h1>

            <div class='font-light prose prose-p:leading-6 prose-li:leading-3'>
              {@html introduction.html}
            </div>

            <form method='POST' use:enhance={() => async ({ update }) => {
              await update()
            }}>
              <input type='hidden' name='moduleId' value={id} />
              <input type='hidden' name='order' value={order} />

              <button class='border border-black/20 mt-10 rounded-xl py-1.5 px-5 text-sm font-bold' type='submit'>
                Let's Get Started!
              </button>
            </form>
          {/if}

          {#if !introduction}
            <header>
              <div class='flex items-start mt-5 mb-3'>
                <h1 class='font-medium text-xl'>{question}</h1>
              </div>
            </header>

            {#each verses as { id, text } (id) }
              <p class='mt-3 text-lg text-gray-500 font-light'>
                {text?.text}
              </p>
            {/each}

            <form
              method='POST'
              use:enhance={({ cancel }) => {
                if(disabled || submitted){
                  return cancel()
                }
                isLoading = true

                return async ({ result }) => {
                  if(result.type == 'success'){
                    isLoading = false
                    submitted = true

                    if(result.data){
                      handleFormResult(result.data.response)
                    }
                  }
                }
              }}>
              <div class='flex items-center justify-center mt-5 relative'>
                <input type='hidden' name='moduleId' value={id} />
                <input type='hidden' name='order' value={order} />

                <input
                  required
                  name='answer'
                  class='w-full text-sm border border-gray-300 p-3 pb-3.5 px-3 font-light rounded-xl focus:outline-0 focus:border-black pr-12 hover:bg-gray-50 focus:bg-gray-50'
                  type='text'
                  placeholder='Type your answer here'
                  disabled={submitted}
                  bind:value={answer}
                />

                {#if !isLoading}
                  <button
                    type='submit'
                    disabled={disabled}
                    class='w-5 h-5 rounded-full flex items-center justify-center scale-90 hover:scale-110 transition-all absolute right-3'
                    class:bg-black={!disabled && !submitted}
                    class:scale-100={!disabled}
                    class:bg-gray-300={disabled || submitted}
                    class:cursor-not-allowed={disabled || submitted}>
                    <ArrowUp variant='light' classname='w-2 bg-green' />
                  </button>
                {/if}

                {#if isLoading}
                  <div class='w-5 h-5 rounded-full border-2 border-black border-dotted animate-spin absolute right-4' />
                {/if}
              </div>
            </form>

            {#if submitted && response}
              { @const { acceptable, feedback } = response }

              <div
                class='rounded-xl py-4 px-5 mt-6 border'
                class:bg-[#F8FFFD]={acceptable}
                class:bg-[#F8F9FF]={!acceptable}
                class:border-[#0E7455]={acceptable}
                class:border-[#716FED]={!acceptable}>

                <p
                  class='text-sm block font-light'
                  class:text-[#0E7455]={acceptable}
                  class:text-[#716FED]={!acceptable}>
                  {feedback}
                </p>
              </div>
            {/if}

            {#if submitted && connectingVerses.length}
              <!--Connecting Verses-->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <button
                on:click={async () => cnVerseOpen = !cnVerseOpen}
                class='w-full flex items-center justify-between mt-6 py-4 px-5 bg-gray-50 border hover:bg-gray-100 border-gray-200 rounded-xl font-bold cursor-pointer'>
                <div class='flex items-center'>
                  <img class='w-3.5 mr-3' src='/connecting-verses.svg' alt='' aria-hidden />

                  <p class='text-[12px]'>
                    {connectingVerses.length} Connecting Verses
                  </p>
                </div>

                <img
                  class={cnVerseOpen ? 'w-3 rotate-180 transition-transform' : 'w-3 transition-transform'}
                  src='/carrot-down-xs.svg'
                  alt=''
                  aria-hidden
                />
              </button>

              {#if cnVerseOpen}
                <div class='p-5 mt-2 bg-gray-50 border border-gray-200 rounded-xl h-full' transition:slide={{ duration: 150, easing: quintInOut }}>
                  <ul>
                    {#each connectingVerses as { reference, text }, i (reference)}
                      { @const lastItem = i === connectingVerses.length - 1 }

                      <li class='mb-3 last:mb-0 relative'>
                        <div class='flex items-center'>
                          <span class='w-3.5 h-3.5 rounded-full border border-black mr-3' />

                          <label class='font-semibold text-xs' for={reference}>
                            {reference}
                          </label>
                        </div>

                        <p
                          id={reference}
                          class='relative font-light text-gray-600 ml-7 mt-2 text-sm after:absolute after:bg-black after:w-px after:h-full after:block after:top-1.5 after:-left-[21px] before:w-1.5 before:h-1.5 before:absolute before:border-b before:border-b-black before:border-l before:border-l-black before:-left-[23.5px] before:-rotate-45 before:-bottom-1.5'
                          class:after:invisible={lastItem}
                          class:before:invisible={lastItem}>
                          {text?.text}
                        </p>
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}
            {/if}

            {#if submitted && commentaries.length}
              <!--Commentaries-->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <button
                on:click={() => commentariesOpen = !commentariesOpen}
                class='w-full flex items-center justify-between mt-4 py-4 px-5 bg-gray-50 border hover:bg-gray-100 border-gray-200 rounded-xl font-bold cursor-pointer'>
                <div class='flex items-center'>
                  <img class='w-[19.5px] mr-3' src='/commentaries.svg' alt='' aria-hidden />

                  <p class='text-[12px]'>
                    {commentaries.length} Commentaries
                  </p>
                </div>

                <img
                  class={commentariesOpen ? 'w-3 rotate-180 transition-transform' : 'w-3 transition-transform'}
                  src='/carrot-down-xs.svg'
                  alt=''
                  aria-hidden
                />
              </button>

              {#if commentariesOpen}
                <div class='p-5 mt-2 bg-gray-50 border border-gray-200 rounded-xl h-full' transition:slide={{ duration: 150, easing: quintInOut }}>
                  <ul>
                    {#each commentaries as { author, reference, text } (reference)}
                      <li class='mb-6 last:mb-0'>
                        {#if reference}
                          <div class='flex items-center'>
                          <span class='w-3.5 h-3.5 rounded-full border border-black mr-3' />

                          <label class='font-semibold text-xs' for={reference}>
                            {reference}
                          </label>
                        </div>
                        {/if}

                        <p
                          id={reference}
                          class='font-light text-gray-600 text-sm'>
                          "{text?.text}" —{author}
                        </p>
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}
            {/if}

            {#if submitted && note}
              <div class='p-5 mt-6 bg-gray-50 border border-gray-200 rounded-xl h-full'>
                <strong class='flex items-center text-xs mb-3'>
                  <img class='w-4 mr-3' src='/note.svg' alt='' aria-hidden /> Note:
                </strong>

                <p class='font-light text-gray-600 text-sm'>{note}</p>
              </div>
            {/if}
          {/if}
        </div>
      </main>
    {/if}
  {/if}
</div>