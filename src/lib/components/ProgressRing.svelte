<script>
  export let progress = 0;
  export let width = 30;
  export let height = 30;
  export let strokeWidth = 2

  let radius = width / 2 - 3;  // subtracting the stroke width and some padding to ensure the circle fits within the SVG
  let circumference = 2 * Math.PI * radius;

  let progressStroke = (progress / 100) * circumference;
  let offset = circumference - progressStroke;
  let cx = width / 2
  let cy = height / 2

  $: radius = width / 2 - 3;
  $: circumference = 2 * Math.PI * radius;
  $: progressStroke = (progress / 100) * circumference;
  $: offset = circumference - progressStroke;
  $: complete = progress === 100
</script>

<svg {width} {height}>
  <circle
    class="fill-none text-gray-300 stroke-current"
    r="{radius}"
    {cx}
    {cy}
    stroke-width="2"
  />

  <circle
    class="fill-none stroke-current rotate-90 origin-center transition-all ease-out duration-1000"
    class:text-black={!complete}
    class:text-emerald-400={complete}
    r="{radius}"
    {cx}
    {cy}
    style="stroke-dasharray: {circumference}; stroke-dashoffset: {offset};"
    stroke-width={strokeWidth}
    stroke-linecap="round"
  />
</svg>
