<script lang='ts'>
  import { color } from '$lib/state/color.js'
  import CourseSection from '$lib/components/CourseSection.svelte'

  export let data
  const { progress, bibleStudy: course } = data

    const moduleCount = course?.sections.reduce(
    (prev, { modules_v2 }) => prev + modules_v2.length, 0
  )
</script>

<svelte:head>
  <title>{course.title}</title>
  <meta name='description' content={course.subtitle} />
</svelte:head>

{#if course}
  <div>
    <!--Hero Section-->
    <section class='w-full lg:flex items-center justify-between mx-auto px-10 py-10 lg:py-20 lg:px-28 border-b border-b-gray-100'>
      <div class='max-w-lg'>
        <h1 class='font-bold text-3xl lg:text-5xl'>
          {course.title}
        </h1>

        <p class='my-5 mb-8 font-light text-gray-600 max-w-sm'>
          {course.subtitle}
        </p>

        <div class='flex items-center'>
          <a href='/classroom/{course.id}'>
            <button
              class='bg-black text-white py-3 px-5 rounded-xl mr-5 hover:bg-cornflower font-semibold'>
              {progress?.progress ? 'Continue': 'Get Started'}
            </button>
          </a>

          {#if progress?.progress}
            <button class='flex items-center font-semibold'>
              {progress?.progress}% Complete
            </button>
          {/if}
        </div>
      </div>

      <div
        class="w-96 h-72 rounded-xl"
        style:background='{$color}'
      />
    </section>

    <!--Course Overview Section-->
    <section class='lg:flex lg:items-center lg:justify-between px-10 py-10 lg:py-10 lg:px-28'>
      <div>
        <h1 class='font-bold lg:text-2xl mb-4'>Course Overview</h1>
        <p class='font-light max-w-sm text-gray-600'>{course.overview}</p>

        <div class='flex items-center mt-4'>
          <div class='flex items-center'>
            <img class='w-4' src='/clock.svg' alt='' aria-hidden />
            <span class='ml-2'>{course.duration}</span>
          </div>

          <div class='flex items-center mx-5'>
            <img class='w-4' src='/sections.svg' alt='' aria-hidden />

            <span class='ml-2'>
              {course.sections.length} Sections
            </span>
          </div>

          <div class='flex items-center'>
            <img class='w-4' src='/modules.svg' alt='' aria-hidden />

            <span class='ml-2'>
              {moduleCount} Modules
            </span>
          </div>
        </div>
      </div>

      <div class='w-96 h-72 bg-slate-800 rounded-xl' />
    </section>

    <!--Course Content Section-->
    <section class='px-10 py-10 lg:py-16 lg:pb-20 lg:px-28 border-t border-t-gray-100'>
      <h1 class='font-bold lg:text-2xl mb-4'>Course Content</h1>

      {#each course.sections as section}
        <CourseSection {section} />
      {/each}
    </section>

    <!--Newsletter Section-->
    <section class='flex items-center justify-between px-10 py-10 lg:py-16 lg:pb-20 lg:px-28 border-t border-t-gray-100'>
      <div class='max-w-md'>
        <h1 class='font-bold text-4xl mb-4'>Get notified when we're launching.</h1>
        <p class='font-light max-w-xs text-gray-600'>Receive the latest Verbx news and updates straight to your inbox.</p>
      </div>

      <form>
        <label for="email-address" class="sr-only">Email address</label>
        <input class='min-w-0 w-80 flex-auto rounded-xl border-0 px-5 py-2.5 text-black mr-2 ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cornflower sm:text-sm sm:leading-6' type='email' name="email" id="email-address" placeholder='Enter your email' autocomplete="email" required />
        <button class='bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-cornflower focus:bg-cornflower focus:outline-none'>Notify me</button>
      </form>
    </section>
  </div>
{/if}