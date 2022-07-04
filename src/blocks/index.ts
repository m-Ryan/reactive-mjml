import { MjmlBody } from './MjmlBody';
import { MjmlRaw } from './MjmlRaw';
import { MjmlWrapper } from './MjmlWrapper';
import { MjmlSection } from './MjmlSection';
import { MjmlColumn } from './MjmlColumn';
import { MjmlText } from './MjmlText';
import { MjmlButton } from './MjmlButton';
import { MjmlImage } from './MjmlImage';
import { MjmlTable } from './MjmlTable';
import { MjmlGroup } from './MjmlGroup';
import { MjmlDivider } from './MjmlDivider';
import { MjmlSpacer } from './MjmlSpacer';
import { MjmlHero } from './MjmlmHero';
import { MjmlAccordion } from './MjmlAccordion';
import { MjmlAccordionElement } from './MjmlAccordionElement';
import { MjmlAccordionTitle } from './MjmlAccordionTitle';
import { MjmlAccordionText } from './MjmlAccordionText';
import { MjmlCarousel } from './MjmlCarousel';
import { MjmlCarouselImage } from './MjmlCarouselImage';
import { MjmlNavbar } from './MjmlNavbar';
import { MjmlNavbarLink } from './MjmlNavbarLink';
import { MjmlSocial } from './MjmlSocial';
import { MjmlSocialElement } from './MjmlSocialElement';
import { MjmlHead } from './MjmlHead';
import { MjmlHeadAttribute } from './MjmlHeadAttributes';
import { MjmlBreakPoint } from './MjmlBreakPoint';

export const blocks: Record<string, any> = {
  'mj-body': MjmlBody,
  'mj-raw': MjmlRaw,
  'mj-hero': MjmlHero,
  'mj-wrapper': MjmlWrapper,
  'mj-section': MjmlSection,
  'mj-column': MjmlColumn,
  'mj-group': MjmlGroup,
  'mj-text': MjmlText,
  'mj-button': MjmlButton,
  'mj-image': MjmlImage,
  'mj-table': MjmlTable,
  'mj-divider': MjmlDivider,
  'mj-spacer': MjmlSpacer,
  'mj-accordion': MjmlAccordion,
  'mj-accordion-element': MjmlAccordionElement,
  'mj-accordion-title': MjmlAccordionTitle,
  'mj-accordion-text': MjmlAccordionText,
  'mj-carousel': MjmlCarousel,
  'mj-carousel-image': MjmlCarouselImage,
  'mj-navbar': MjmlNavbar,
  'mj-navbar-link': MjmlNavbarLink,
  'mj-social': MjmlSocial,
  'mj-social-element': MjmlSocialElement,
  'mj-head': MjmlHead,
  'mj-attributes': MjmlHeadAttribute,
  'mj-breakpoint': MjmlBreakPoint,
};
