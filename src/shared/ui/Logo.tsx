import { Group, Text } from "@mantine/core"

import { site } from "@/shared/config"

export function Logo({ withText = true }: { withText?: boolean }) {
  return (
    <Group
      gap={10}
      wrap='nowrap'
    >
      <svg
        width='30'
        height='30'
        viewBox='0 0 32 32'
        aria-hidden
      >
        <defs>
          <linearGradient
            id='logo-g'
            x1='0'
            y1='0'
            x2='1'
            y2='1'
          >
            <stop
              offset='0'
              stopColor='var(--app-logo-from)'
            />
            <stop
              offset='1'
              stopColor='var(--app-logo-to)'
            />
          </linearGradient>
        </defs>
        <rect
          width='32'
          height='32'
          rx='9'
          fill='url(#logo-g)'
        />
        <path
          d='M16 6.5l7.5 2.8v5.6c0 4.7-3.2 8.7-7.5 10.3-4.3-1.6-7.5-5.6-7.5-10.3V9.3z'
          fill='var(--app-logo-shield, #fff)'
        />
        <path
          d='M12.6 16l2.4 2.4 4.4-4.8'
          stroke='var(--app-logo-mark)'
          strokeWidth='2.2'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      {withText && (
        <Text
          fw={700}
          size='lg'
          visibleFrom='xs'
          style={{ whiteSpace: "nowrap" }}
        >
          {site.name}
        </Text>
      )}
    </Group>
  )
}
