import { MjmlBody } from './MjmlBody';
import { MjmlSection } from './MjmlSection';
import { MjmlColumn } from './MjmlColumn';
import { MjmlText } from './MjmlText';
import { MjmlButton } from './MjmlButton';
import { MjmlImage } from './MjmlImage';
import { MjmlGroup } from './MjmlGroup';
import { MjmlDivider } from './MjmlDivider';
import { MjmlHero } from './MjmlmHero';
import { MjmlAccordion } from './MjmlAccordion';
import { MjmlAccordionElement } from './MjmlAccordionElement';
import { MjmlAccordionTitle } from './MjmlAccordionTitle';
import { MjmlAccordionText } from './MjmlAccordionText';
import { MjmlCarousel } from './MjmlCarousel';
import { MjmlCarouselImage } from './MjmlCarouselImage';

export const blocks: Record<string, any> = {
  'mj-body': MjmlBody,
  'mj-hero': MjmlHero,
  'mj-section': MjmlSection,
  'mj-column': MjmlColumn,
  'mj-group': MjmlGroup,
  'mj-text': MjmlText,
  'mj-button': MjmlButton,
  'mj-image': MjmlImage,
  'mj-divider': MjmlDivider,
  'mj-accordion': MjmlAccordion,
  'mj-accordion-element': MjmlAccordionElement,
  'mj-accordion-title': MjmlAccordionTitle,
  'mj-accordion-text': MjmlAccordionText,
  'mj-carousel': MjmlCarousel,
  'mj-carousel-image': MjmlCarouselImage,
};
