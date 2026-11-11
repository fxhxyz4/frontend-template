import { Button, Card, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import { IconArrowRight, IconFileSearch, IconMessageChatbot, IconScale } from "@tabler/icons-react"
import { Link } from "react-router"
import type { Icon } from "@tabler/icons-react"

import { paths, site } from "@/shared/config"
import { Seo } from "@/shared/ui"
import classes from "./HomePage.module.scss"

const features: { icon: Icon; title: string; text: string }[] = [
  {
    icon: IconMessageChatbot,
    title: "Відповіді з джерелами",
    text: "Агент шукає норми в базі законодавства (RAG) і посилається на конкретні статті.",
  },
  {
    icon: IconFileSearch,
    title: "Аналіз документів",
    text: "Виявляє корупціогенні фактори в проєктах рішень і пропонує, як їх усунути.",
  },
  {
    icon: IconScale,
    title: "Актуальна база",
    text: "Закони, кодекси та методології НАЗК індексуються у векторну базу через чергу.",
  },
]

export function HomePage() {
  return (
    <>
      <Seo />
      <section className={classes.hero}>
        <Stack
          gap='lg'
          align='flex-start'
          className='fade-up'
        >
          <Text className={classes.eyebrow}>Хакатон 2026 · антикорупційне законодавство</Text>
          <Title className={classes.title}>
            Законодавство, яке <span className={classes.accent}>відповідає</span> на питання
          </Title>
          <Text
            className={classes.lead}
            c='dimmed'
          >
            {site.description}
          </Text>
          <Group gap='sm'>
            <Button
              component={Link}
              to={paths.dashboard}
              size='md'
              rightSection={<IconArrowRight size={18} />}
            >
              Відкрити дашборд
            </Button>
            <Button
              component='a'
              href='#features'
              size='md'
              variant='default'
            >
              Можливості
            </Button>
          </Group>
        </Stack>
      </section>

      <SimpleGrid
        id='features'
        cols={{ base: 1, sm: 2, lg: 3 }}
        className='stagger'
        mt='xl'
      >
        {features.map(({ icon: FeatureIcon, title, text }, i) => (
          <Card
            key={title}
            className='hover-lift'
            style={{ "--i": i }}
          >
            <ThemeIcon
              size={44}
              radius='md'
              variant='filled'
              gradient={{ from: "sapphire.6", to: "sapphire.4", deg: 135 }}
            >
              <FeatureIcon size={24} />
            </ThemeIcon>
            <Text
              fw={600}
              mt='md'
              size='lg'
            >
              {title}
            </Text>
            <Text
              c='dimmed'
              mt={6}
            >
              {text}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </>
  )
}
