
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'LayoutFullLogo': typeof import("../components/Layout/Full/logo/Logo.vue")['default']
    'LayoutFullLogoDark': typeof import("../components/Layout/Full/logo/LogoDark.vue")['default']
    'LayoutFullLogoDarkRtl': typeof import("../components/Layout/Full/logo/LogoDarkRtl.vue")['default']
    'LayoutFullLogoLight': typeof import("../components/Layout/Full/logo/LogoLight.vue")['default']
    'LayoutFullLogoLightRtl': typeof import("../components/Layout/Full/logo/LogoLightRtl.vue")['default']
    'LayoutFullLogoMain': typeof import("../components/Layout/Full/logo/LogoMain.vue")['default']
    'LayoutFullVerticalHeaderNotificationDD': typeof import("../components/Layout/Full/vertical-header/NotificationDD.vue")['default']
    'LayoutFullVerticalHeaderProfileDD': typeof import("../components/Layout/Full/vertical-header/ProfileDD.vue")['default']
    'LayoutFullVerticalSidebarDropdown': typeof import("../components/Layout/Full/vertical-sidebar/Dropdown/index.vue")['default']
    'LayoutFullVerticalSidebarIcon': typeof import("../components/Layout/Full/vertical-sidebar/Icon.vue")['default']
    'LayoutFullVerticalSidebarNavCollapse': typeof import("../components/Layout/Full/vertical-sidebar/NavCollapse/index.vue")['default']
    'LayoutFullVerticalSidebarNavGroup': typeof import("../components/Layout/Full/vertical-sidebar/NavGroup/index.vue")['default']
    'LayoutFullVerticalSidebarNavItem': typeof import("../components/Layout/Full/vertical-sidebar/NavItem/index.vue")['default']
    'LayoutFullVerticalSidebarItem': typeof import("../components/Layout/Full/vertical-sidebar/sidebarItem")['default']
    'LayoutMain': typeof import("../components/Layout/Main.vue")['default']
    'LayoutTopbar': typeof import("../components/Layout/Topbar.vue")['default']
    'AuthLoginForm': typeof import("../components/auth/LoginForm.vue")['default']
    'AuthRegisterForm': typeof import("../components/auth/RegisterForm.vue")['default']
    'DashboardsProductCards': typeof import("../components/dashboards/ProductCards.vue")['default']
    'DashboardsProductSales': typeof import("../components/dashboards/ProductSales.vue")['default']
    'DashboardsProfitExpense': typeof import("../components/dashboards/ProfitExpense.vue")['default']
    'DashboardsTopPayingClients': typeof import("../components/dashboards/TopPayingClients.vue")['default']
    'DashboardsTrafficDistribution': typeof import("../components/dashboards/TrafficDistribution.vue")['default']
    'DashboardsUpcommingSchedule': typeof import("../components/dashboards/UpcommingSchedule.vue")['default']
    'SharedBaseCard': typeof import("../components/shared/BaseCard.vue")['default']
    'SharedCardHeaderFooter': typeof import("../components/shared/CardHeaderFooter.vue")['default']
    'SharedUiChildCard': typeof import("../components/shared/UiChildCard.vue")['default']
    'SharedUiParentCard': typeof import("../components/shared/UiParentCard.vue")['default']
    'SharedUiParentCardLogo': typeof import("../components/shared/UiParentCardLogo.vue")['default']
    'UiComponentsAlertBasic': typeof import("../components/ui-components/alert/Basic.vue")['default']
    'UiComponentsAlertClosable': typeof import("../components/ui-components/alert/Closable.vue")['default']
    'UiComponentsAlertFilled': typeof import("../components/ui-components/alert/Filled.vue")['default']
    'UiComponentsButtonBaseButtons': typeof import("../components/ui-components/button/BaseButtons.vue")['default']
    'UiComponentsButtonColorsButtons': typeof import("../components/ui-components/button/ColorsButtons.vue")['default']
    'UiComponentsButtonIconColorSizes': typeof import("../components/ui-components/button/IconColorSizes.vue")['default']
    'UiComponentsButtonOutlinedButtons': typeof import("../components/ui-components/button/OutlinedButtons.vue")['default']
    'UiComponentsButtonSizeButtons': typeof import("../components/ui-components/button/SizeButtons.vue")['default']
    'UiComponentsButtonTextButtons': typeof import("../components/ui-components/button/TextButtons.vue")['default']
    'UiComponentsCardsContentWrap': typeof import("../components/ui-components/cards/CardsContentWrap.vue")['default']
    'UiComponentsCardsMedia': typeof import("../components/ui-components/cards/CardsMedia.vue")['default']
    'UiComponentsCardsProps': typeof import("../components/ui-components/cards/CardsProps.vue")['default']
    'UiComponentsCardsSlots': typeof import("../components/ui-components/cards/CardsSlots.vue")['default']
    'UiComponentsCardsTwitter': typeof import("../components/ui-components/cards/CardsTwitter.vue")['default']
    'UiComponentsCardsWeather': typeof import("../components/ui-components/cards/CardsWeather.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyLayoutFullLogo': LazyComponent<typeof import("../components/Layout/Full/logo/Logo.vue")['default']>
    'LazyLayoutFullLogoDark': LazyComponent<typeof import("../components/Layout/Full/logo/LogoDark.vue")['default']>
    'LazyLayoutFullLogoDarkRtl': LazyComponent<typeof import("../components/Layout/Full/logo/LogoDarkRtl.vue")['default']>
    'LazyLayoutFullLogoLight': LazyComponent<typeof import("../components/Layout/Full/logo/LogoLight.vue")['default']>
    'LazyLayoutFullLogoLightRtl': LazyComponent<typeof import("../components/Layout/Full/logo/LogoLightRtl.vue")['default']>
    'LazyLayoutFullLogoMain': LazyComponent<typeof import("../components/Layout/Full/logo/LogoMain.vue")['default']>
    'LazyLayoutFullVerticalHeaderNotificationDD': LazyComponent<typeof import("../components/Layout/Full/vertical-header/NotificationDD.vue")['default']>
    'LazyLayoutFullVerticalHeaderProfileDD': LazyComponent<typeof import("../components/Layout/Full/vertical-header/ProfileDD.vue")['default']>
    'LazyLayoutFullVerticalSidebarDropdown': LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/Dropdown/index.vue")['default']>
    'LazyLayoutFullVerticalSidebarIcon': LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/Icon.vue")['default']>
    'LazyLayoutFullVerticalSidebarNavCollapse': LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/NavCollapse/index.vue")['default']>
    'LazyLayoutFullVerticalSidebarNavGroup': LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/NavGroup/index.vue")['default']>
    'LazyLayoutFullVerticalSidebarNavItem': LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/NavItem/index.vue")['default']>
    'LazyLayoutFullVerticalSidebarItem': LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/sidebarItem")['default']>
    'LazyLayoutMain': LazyComponent<typeof import("../components/Layout/Main.vue")['default']>
    'LazyLayoutTopbar': LazyComponent<typeof import("../components/Layout/Topbar.vue")['default']>
    'LazyAuthLoginForm': LazyComponent<typeof import("../components/auth/LoginForm.vue")['default']>
    'LazyAuthRegisterForm': LazyComponent<typeof import("../components/auth/RegisterForm.vue")['default']>
    'LazyDashboardsProductCards': LazyComponent<typeof import("../components/dashboards/ProductCards.vue")['default']>
    'LazyDashboardsProductSales': LazyComponent<typeof import("../components/dashboards/ProductSales.vue")['default']>
    'LazyDashboardsProfitExpense': LazyComponent<typeof import("../components/dashboards/ProfitExpense.vue")['default']>
    'LazyDashboardsTopPayingClients': LazyComponent<typeof import("../components/dashboards/TopPayingClients.vue")['default']>
    'LazyDashboardsTrafficDistribution': LazyComponent<typeof import("../components/dashboards/TrafficDistribution.vue")['default']>
    'LazyDashboardsUpcommingSchedule': LazyComponent<typeof import("../components/dashboards/UpcommingSchedule.vue")['default']>
    'LazySharedBaseCard': LazyComponent<typeof import("../components/shared/BaseCard.vue")['default']>
    'LazySharedCardHeaderFooter': LazyComponent<typeof import("../components/shared/CardHeaderFooter.vue")['default']>
    'LazySharedUiChildCard': LazyComponent<typeof import("../components/shared/UiChildCard.vue")['default']>
    'LazySharedUiParentCard': LazyComponent<typeof import("../components/shared/UiParentCard.vue")['default']>
    'LazySharedUiParentCardLogo': LazyComponent<typeof import("../components/shared/UiParentCardLogo.vue")['default']>
    'LazyUiComponentsAlertBasic': LazyComponent<typeof import("../components/ui-components/alert/Basic.vue")['default']>
    'LazyUiComponentsAlertClosable': LazyComponent<typeof import("../components/ui-components/alert/Closable.vue")['default']>
    'LazyUiComponentsAlertFilled': LazyComponent<typeof import("../components/ui-components/alert/Filled.vue")['default']>
    'LazyUiComponentsButtonBaseButtons': LazyComponent<typeof import("../components/ui-components/button/BaseButtons.vue")['default']>
    'LazyUiComponentsButtonColorsButtons': LazyComponent<typeof import("../components/ui-components/button/ColorsButtons.vue")['default']>
    'LazyUiComponentsButtonIconColorSizes': LazyComponent<typeof import("../components/ui-components/button/IconColorSizes.vue")['default']>
    'LazyUiComponentsButtonOutlinedButtons': LazyComponent<typeof import("../components/ui-components/button/OutlinedButtons.vue")['default']>
    'LazyUiComponentsButtonSizeButtons': LazyComponent<typeof import("../components/ui-components/button/SizeButtons.vue")['default']>
    'LazyUiComponentsButtonTextButtons': LazyComponent<typeof import("../components/ui-components/button/TextButtons.vue")['default']>
    'LazyUiComponentsCardsContentWrap': LazyComponent<typeof import("../components/ui-components/cards/CardsContentWrap.vue")['default']>
    'LazyUiComponentsCardsMedia': LazyComponent<typeof import("../components/ui-components/cards/CardsMedia.vue")['default']>
    'LazyUiComponentsCardsProps': LazyComponent<typeof import("../components/ui-components/cards/CardsProps.vue")['default']>
    'LazyUiComponentsCardsSlots': LazyComponent<typeof import("../components/ui-components/cards/CardsSlots.vue")['default']>
    'LazyUiComponentsCardsTwitter': LazyComponent<typeof import("../components/ui-components/cards/CardsTwitter.vue")['default']>
    'LazyUiComponentsCardsWeather': LazyComponent<typeof import("../components/ui-components/cards/CardsWeather.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const LayoutFullLogo: typeof import("../components/Layout/Full/logo/Logo.vue")['default']
export const LayoutFullLogoDark: typeof import("../components/Layout/Full/logo/LogoDark.vue")['default']
export const LayoutFullLogoDarkRtl: typeof import("../components/Layout/Full/logo/LogoDarkRtl.vue")['default']
export const LayoutFullLogoLight: typeof import("../components/Layout/Full/logo/LogoLight.vue")['default']
export const LayoutFullLogoLightRtl: typeof import("../components/Layout/Full/logo/LogoLightRtl.vue")['default']
export const LayoutFullLogoMain: typeof import("../components/Layout/Full/logo/LogoMain.vue")['default']
export const LayoutFullVerticalHeaderNotificationDD: typeof import("../components/Layout/Full/vertical-header/NotificationDD.vue")['default']
export const LayoutFullVerticalHeaderProfileDD: typeof import("../components/Layout/Full/vertical-header/ProfileDD.vue")['default']
export const LayoutFullVerticalSidebarDropdown: typeof import("../components/Layout/Full/vertical-sidebar/Dropdown/index.vue")['default']
export const LayoutFullVerticalSidebarIcon: typeof import("../components/Layout/Full/vertical-sidebar/Icon.vue")['default']
export const LayoutFullVerticalSidebarNavCollapse: typeof import("../components/Layout/Full/vertical-sidebar/NavCollapse/index.vue")['default']
export const LayoutFullVerticalSidebarNavGroup: typeof import("../components/Layout/Full/vertical-sidebar/NavGroup/index.vue")['default']
export const LayoutFullVerticalSidebarNavItem: typeof import("../components/Layout/Full/vertical-sidebar/NavItem/index.vue")['default']
export const LayoutFullVerticalSidebarItem: typeof import("../components/Layout/Full/vertical-sidebar/sidebarItem")['default']
export const LayoutMain: typeof import("../components/Layout/Main.vue")['default']
export const LayoutTopbar: typeof import("../components/Layout/Topbar.vue")['default']
export const AuthLoginForm: typeof import("../components/auth/LoginForm.vue")['default']
export const AuthRegisterForm: typeof import("../components/auth/RegisterForm.vue")['default']
export const DashboardsProductCards: typeof import("../components/dashboards/ProductCards.vue")['default']
export const DashboardsProductSales: typeof import("../components/dashboards/ProductSales.vue")['default']
export const DashboardsProfitExpense: typeof import("../components/dashboards/ProfitExpense.vue")['default']
export const DashboardsTopPayingClients: typeof import("../components/dashboards/TopPayingClients.vue")['default']
export const DashboardsTrafficDistribution: typeof import("../components/dashboards/TrafficDistribution.vue")['default']
export const DashboardsUpcommingSchedule: typeof import("../components/dashboards/UpcommingSchedule.vue")['default']
export const SharedBaseCard: typeof import("../components/shared/BaseCard.vue")['default']
export const SharedCardHeaderFooter: typeof import("../components/shared/CardHeaderFooter.vue")['default']
export const SharedUiChildCard: typeof import("../components/shared/UiChildCard.vue")['default']
export const SharedUiParentCard: typeof import("../components/shared/UiParentCard.vue")['default']
export const SharedUiParentCardLogo: typeof import("../components/shared/UiParentCardLogo.vue")['default']
export const UiComponentsAlertBasic: typeof import("../components/ui-components/alert/Basic.vue")['default']
export const UiComponentsAlertClosable: typeof import("../components/ui-components/alert/Closable.vue")['default']
export const UiComponentsAlertFilled: typeof import("../components/ui-components/alert/Filled.vue")['default']
export const UiComponentsButtonBaseButtons: typeof import("../components/ui-components/button/BaseButtons.vue")['default']
export const UiComponentsButtonColorsButtons: typeof import("../components/ui-components/button/ColorsButtons.vue")['default']
export const UiComponentsButtonIconColorSizes: typeof import("../components/ui-components/button/IconColorSizes.vue")['default']
export const UiComponentsButtonOutlinedButtons: typeof import("../components/ui-components/button/OutlinedButtons.vue")['default']
export const UiComponentsButtonSizeButtons: typeof import("../components/ui-components/button/SizeButtons.vue")['default']
export const UiComponentsButtonTextButtons: typeof import("../components/ui-components/button/TextButtons.vue")['default']
export const UiComponentsCardsContentWrap: typeof import("../components/ui-components/cards/CardsContentWrap.vue")['default']
export const UiComponentsCardsMedia: typeof import("../components/ui-components/cards/CardsMedia.vue")['default']
export const UiComponentsCardsProps: typeof import("../components/ui-components/cards/CardsProps.vue")['default']
export const UiComponentsCardsSlots: typeof import("../components/ui-components/cards/CardsSlots.vue")['default']
export const UiComponentsCardsTwitter: typeof import("../components/ui-components/cards/CardsTwitter.vue")['default']
export const UiComponentsCardsWeather: typeof import("../components/ui-components/cards/CardsWeather.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyLayoutFullLogo: LazyComponent<typeof import("../components/Layout/Full/logo/Logo.vue")['default']>
export const LazyLayoutFullLogoDark: LazyComponent<typeof import("../components/Layout/Full/logo/LogoDark.vue")['default']>
export const LazyLayoutFullLogoDarkRtl: LazyComponent<typeof import("../components/Layout/Full/logo/LogoDarkRtl.vue")['default']>
export const LazyLayoutFullLogoLight: LazyComponent<typeof import("../components/Layout/Full/logo/LogoLight.vue")['default']>
export const LazyLayoutFullLogoLightRtl: LazyComponent<typeof import("../components/Layout/Full/logo/LogoLightRtl.vue")['default']>
export const LazyLayoutFullLogoMain: LazyComponent<typeof import("../components/Layout/Full/logo/LogoMain.vue")['default']>
export const LazyLayoutFullVerticalHeaderNotificationDD: LazyComponent<typeof import("../components/Layout/Full/vertical-header/NotificationDD.vue")['default']>
export const LazyLayoutFullVerticalHeaderProfileDD: LazyComponent<typeof import("../components/Layout/Full/vertical-header/ProfileDD.vue")['default']>
export const LazyLayoutFullVerticalSidebarDropdown: LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/Dropdown/index.vue")['default']>
export const LazyLayoutFullVerticalSidebarIcon: LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/Icon.vue")['default']>
export const LazyLayoutFullVerticalSidebarNavCollapse: LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/NavCollapse/index.vue")['default']>
export const LazyLayoutFullVerticalSidebarNavGroup: LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/NavGroup/index.vue")['default']>
export const LazyLayoutFullVerticalSidebarNavItem: LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/NavItem/index.vue")['default']>
export const LazyLayoutFullVerticalSidebarItem: LazyComponent<typeof import("../components/Layout/Full/vertical-sidebar/sidebarItem")['default']>
export const LazyLayoutMain: LazyComponent<typeof import("../components/Layout/Main.vue")['default']>
export const LazyLayoutTopbar: LazyComponent<typeof import("../components/Layout/Topbar.vue")['default']>
export const LazyAuthLoginForm: LazyComponent<typeof import("../components/auth/LoginForm.vue")['default']>
export const LazyAuthRegisterForm: LazyComponent<typeof import("../components/auth/RegisterForm.vue")['default']>
export const LazyDashboardsProductCards: LazyComponent<typeof import("../components/dashboards/ProductCards.vue")['default']>
export const LazyDashboardsProductSales: LazyComponent<typeof import("../components/dashboards/ProductSales.vue")['default']>
export const LazyDashboardsProfitExpense: LazyComponent<typeof import("../components/dashboards/ProfitExpense.vue")['default']>
export const LazyDashboardsTopPayingClients: LazyComponent<typeof import("../components/dashboards/TopPayingClients.vue")['default']>
export const LazyDashboardsTrafficDistribution: LazyComponent<typeof import("../components/dashboards/TrafficDistribution.vue")['default']>
export const LazyDashboardsUpcommingSchedule: LazyComponent<typeof import("../components/dashboards/UpcommingSchedule.vue")['default']>
export const LazySharedBaseCard: LazyComponent<typeof import("../components/shared/BaseCard.vue")['default']>
export const LazySharedCardHeaderFooter: LazyComponent<typeof import("../components/shared/CardHeaderFooter.vue")['default']>
export const LazySharedUiChildCard: LazyComponent<typeof import("../components/shared/UiChildCard.vue")['default']>
export const LazySharedUiParentCard: LazyComponent<typeof import("../components/shared/UiParentCard.vue")['default']>
export const LazySharedUiParentCardLogo: LazyComponent<typeof import("../components/shared/UiParentCardLogo.vue")['default']>
export const LazyUiComponentsAlertBasic: LazyComponent<typeof import("../components/ui-components/alert/Basic.vue")['default']>
export const LazyUiComponentsAlertClosable: LazyComponent<typeof import("../components/ui-components/alert/Closable.vue")['default']>
export const LazyUiComponentsAlertFilled: LazyComponent<typeof import("../components/ui-components/alert/Filled.vue")['default']>
export const LazyUiComponentsButtonBaseButtons: LazyComponent<typeof import("../components/ui-components/button/BaseButtons.vue")['default']>
export const LazyUiComponentsButtonColorsButtons: LazyComponent<typeof import("../components/ui-components/button/ColorsButtons.vue")['default']>
export const LazyUiComponentsButtonIconColorSizes: LazyComponent<typeof import("../components/ui-components/button/IconColorSizes.vue")['default']>
export const LazyUiComponentsButtonOutlinedButtons: LazyComponent<typeof import("../components/ui-components/button/OutlinedButtons.vue")['default']>
export const LazyUiComponentsButtonSizeButtons: LazyComponent<typeof import("../components/ui-components/button/SizeButtons.vue")['default']>
export const LazyUiComponentsButtonTextButtons: LazyComponent<typeof import("../components/ui-components/button/TextButtons.vue")['default']>
export const LazyUiComponentsCardsContentWrap: LazyComponent<typeof import("../components/ui-components/cards/CardsContentWrap.vue")['default']>
export const LazyUiComponentsCardsMedia: LazyComponent<typeof import("../components/ui-components/cards/CardsMedia.vue")['default']>
export const LazyUiComponentsCardsProps: LazyComponent<typeof import("../components/ui-components/cards/CardsProps.vue")['default']>
export const LazyUiComponentsCardsSlots: LazyComponent<typeof import("../components/ui-components/cards/CardsSlots.vue")['default']>
export const LazyUiComponentsCardsTwitter: LazyComponent<typeof import("../components/ui-components/cards/CardsTwitter.vue")['default']>
export const LazyUiComponentsCardsWeather: LazyComponent<typeof import("../components/ui-components/cards/CardsWeather.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
