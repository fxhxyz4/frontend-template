import { ActionIcon, Group, Menu, Text } from "@mantine/core"
import { IconCheck, IconPalette } from "@tabler/icons-react"
import type { ThemePresetId } from "@/app/theme"

import { presets, useThemePreset } from "@/app/theme"
import classes from "./ThemePresetSwitcher.module.scss"

function Swatches({ colors }: { colors: string[] }) {
  return (
    <span className={classes.swatches}>
      {colors.map(color => (
        <span
          key={color}
          className={classes.swatch}
          style={{ background: color }}
        />
      ))}
    </span>
  )
}

export function ThemePresetSwitcher() {
  const { preset, setPreset } = useThemePreset()

  return (
    <Menu
      position='bottom-end'
      width={220}
      shadow='md'
    >
      <Menu.Target>
        <ActionIcon
          variant='default'
          size='lg'
          aria-label='Тема оформлення'
        >
          <IconPalette size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Тема оформлення</Menu.Label>
        {Object.values(presets).map(p => (
          <Menu.Item
            key={p.id}
            onClick={() => setPreset(p.id as ThemePresetId)}
            leftSection={<Swatches colors={p.swatches} />}
            rightSection={p.id === preset ? <IconCheck size={16} /> : null}
          >
            <Group gap={0}>
              <Text size='sm'>{p.label}</Text>
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
