<script lang='ts'>
  import '../../../app.postcss'

  import type { PageData } from './$types'

  import { CourseSection, ArrowRight, ArrowUp, ProgressRing } from '../../../components'
  import { enhance } from '$app/forms'

  export let data : PageData

  let isLoading   : boolean = false
  let answer      : string  = ''
  let disabled    : boolean
  let submitted   : boolean = false
  let response    : string | null

  $: {
    isLoading,
    answer,
    disabled = !answer.trim() // .trim removes whitespaces
    submitted,
    response  = null
  }
</script>

<div class='flex items-start justify-between h-screen'>
  {#if data.activeModule}

    {@const {
      id,
      title,
      introduction,
      isCriticalthinking,
      question,
      verses,
      order
      } = data.activeModule
    }

    {@const src = (!isCriticalthinking ? '/book.svg': '/spark.svg')}
    {@const progress = data.progress}

    <div class='border-r border-r-gray-100 w-1/2 h-screen'>
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

      <nav>
        <ul>
          {#each data.course.sections as section, i}
            <li>
              <CourseSection
                sectionCompleted={data?.complete ?? false}
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
      <main class='w-3/4 h-full p-10'>
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
            <p class='font-light'>{introduction.text}</p>

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
                <img class='pt-1 w-5 mr-3' {src} alt='' aria-hidden />
                <h1 class='font-medium text-lg'>{question}</h1>
              </div>
            </header>

            {#each verses as { id, text } (id) }
              <p class='mt-3 text-xl text-gray-500 font-light'>
                {text?.text}
              </p>
            {/each}

            <form
              method='POST'
              use:enhance={({ cancel }) => {
                if(disabled){
                  cancel()
                }
                isLoading = true

                return async ({ result }) => {
                  if(result.type == 'success'){
                    isLoading = false
                    submitted = true

                    if(result?.data?.response){
                      response = result.data.response
                    }
                  }
                }
              }}>
              <div class='flex items-center justify-center mt-5'>
                <input type='hidden' name='moduleId' value={id} />
                <input type='hidden' name='order' value={order} />

                {#if isCriticalthinking}
                  <textarea
                    class='w-full mr-3 border border-black p-3 pb-3.5 font-light rounded-xl'
                    placeholder="Type your answer here"
                    name='answer'
                    required
                    bind:value={answer}
                  />

                  {:else}
                  <input
                    required
                    name='answer'
                    class='w-full mr-3 border border-black p-2 pb-2.5 px-3 font-light rounded-xl focus:outline-black'
                    type='text'
                    placeholder='Type your answer here'
                    bind:value={answer}
                  />
                {/if}

                {#if !isLoading}
                  <button
                    type='submit'
                    disabled={disabled}
                    class='w-5 h-5 rounded-full flex items-center justify-center hover:scale-110 transition-all shrink-0'
                    class:bg-black={!disabled && !submitted}
                    class:bg-green-100={submitted}
                    class:bg-gray-300={disabled}
                    class:cursor-not-allowed={disabled}>

                    {#if submitted}
                      <img
                        src='/submitted.svg'
                        alt='A green check icon'
                      />
                      {:else}
                        <ArrowUp variant='light' classname='w-2 bg-green' />
                    {/if}
                  </button>
                {/if}

                {#if isLoading}
                  <img
                    class='w-5 h-5 animate-spin'
                    src='/spinner.svg'
                    alt='rotating spinner icon'
                  />
                {/if}
              </div>
            </form>
          {/if}

          {#if response}
            <small class='mt-4 text-sm block'>
              {response}
            </small>
          {/if}
        </div>
      </main>
    {/if}
  {/if}
</div>