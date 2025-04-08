type FetchOptions = {
  query: string
  variables?: Record<string, any>
  preview?: boolean
}

export async function fetchDatoCMS<T>({ query, variables = {}, preview = false }: FetchOptions): Promise<T> {
  const endpoint = "https://graphql.datocms.com"
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.DATOCMS_API_TOKEN}`,
    ...(preview && { "X-Include-Drafts": "true" }),
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  })

  const { data, errors } = await response.json()

  if (errors) {
    console.error("DatoCMS errors:", errors)
    throw new Error("Failed to fetch data from DatoCMS")
  }

  return data
}

export async function getHomePage(locale: string) {
  const query = `
    query HomePage($locale: SiteLocale!) {
      homePage(locale: $locale) {
        heroTitle
        heroSubtitle
        heroScrollText
        heroVideo {
          url
        }
        gestacionTitle
        gestacionTagline
        gestacionButtonText
        gestacionVideo {
          url
        }
        postpartoTitle
        postpartoTagline
        postpartoButtonText
        postpartoVideo {
          url
        }
        maternidadesTitle
        maternidadesTagline
        maternidadesButtonText
        maternidadesVideo {
          url
        }
        aboutTitle
        aboutContent
        videoSectionTitle
        videoSectionVideo {
          url
        }
        finalSectionTitle
      }
    }
  `

  const data = await fetchDatoCMS<{ homePage: any }>({
    query,
    variables: { locale },
  })

  return data.homePage
}

export async function getAboutPage(locale: string) {
  const query = `
    query AboutPage($locale: SiteLocale!) {
      aboutPage(locale: $locale) {
        title
        content
        image {
          url
          alt
        }
      }
    }
  `

  const data = await fetchDatoCMS<{ aboutPage: any }>({
    query,
    variables: { locale },
  })

  return data.aboutPage
}
