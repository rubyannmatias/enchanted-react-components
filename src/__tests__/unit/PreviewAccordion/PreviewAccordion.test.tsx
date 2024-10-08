/* ======================================================================== *
 * Copyright 2024 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */

import React from 'react';
import {
  render, cleanup, fireEvent,
} from '@testing-library/react';
import ChevronDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';
import RocketIcon from '@hcl-software/enchanted-icons/dist/carbon/es/rocket';
import { ThemeProvider } from '@emotion/react';
import { createLtrTheme } from '../../../theme';
import Typography from '../../../Typography';
import Checkbox from '../../../Checkbox/Checkbox';
import PreviewAccordionSummary from '../../../PreviewAccordion/PreviewAccordionSummary';
import PreviewAccordion from '../../../PreviewAccordion/PreviewAccordion';
import PreviewAccordionDetails from '../../../PreviewAccordion/PreviewAccordionDetails';
import Avatar, { AvatarTypes } from '../../../Avatar/Avatar';
import Link from '../../../Link/Link';

afterEach(cleanup);
describe('Accordion component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={createLtrTheme()}>
        <PreviewAccordion>
          <PreviewAccordionSummary
            expandIcon={<ChevronDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            leftsection={<Avatar iconImage={<RocketIcon />} type={AvatarTypes.ICON} variant="rounded" />}
            titlelink={(
              <Link
                href="#"
                target="_blank"
                hoverBackground={false}
                underline="always"
                onClick={(event) => { return event.stopPropagation(); }}
              >
                Link 1
              </Link>
            )}
          />
        </PreviewAccordion>
      </ThemeProvider>,
    );
    expect(getByText('Link 1')).toBeTruthy();
  });

  it('expands and collapses when clicked', () => {
    const { getByRole } = render(
      <ThemeProvider theme={createLtrTheme()}>
        <PreviewAccordion>
          <PreviewAccordionSummary
            expandIcon={<ChevronDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            leftsection={<Avatar iconImage={<RocketIcon />} type={AvatarTypes.ICON} variant="rounded" />}
            titlelink={(
              <Link
                href="#"
                target="_blank"
                hoverBackground={false}
                underline="always"
                onClick={(event) => { return event.stopPropagation(); }}
              >
                Link 1
              </Link>
            )}
          />
        </PreviewAccordion>
      </ThemeProvider>,
    );
    const summary = getByRole('button');
    fireEvent.click(summary);
    // Check if the Accordion is expanded
    expect(summary.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(summary);
    // Check if the Accordion is collapsed
    expect(summary.getAttribute('aria-expanded')).toBe('false');
  });

  it('changes checkbox state when clicked', () => {
    const { getByRole } = render(
      <ThemeProvider theme={createLtrTheme()}>
        <PreviewAccordion>
          <PreviewAccordionSummary
            expandIcon={<ChevronDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            leftsection={<Checkbox />}
            titlelink={(
              <Link
                href="#"
                target="_blank"
                hoverBackground={false}
                underline="always"
                onClick={(event) => { return event.stopPropagation(); }}
              >
                Link 1
              </Link>
            )}
          />
        </PreviewAccordion>
      </ThemeProvider>,
    );

    const checkbox = getByRole('checkbox') as HTMLInputElement;
    // Check if the Checkbox is initially unchecked
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    // Check if the Checkbox is checked
    expect(checkbox.checked).toBe(true);
  });

  it('AccordionDetails contains the correct text', () => {
    const { getByText } = render(
      <ThemeProvider theme={createLtrTheme()}>
        <PreviewAccordion>
          <PreviewAccordionSummary
            expandIcon={<ChevronDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            leftsection={<Checkbox />}
            titlelink={(
              <Link
                href="#"
                target="_blank"
                hoverBackground={false}
                underline="always"
                onClick={(event) => { return event.stopPropagation(); }}
              >
                Link 1
              </Link>
            )}
            subtitle={<Typography variant="body2">Level</Typography>}
          />
          <PreviewAccordionDetails>
            <Typography variant="body2">Details</Typography>
          </PreviewAccordionDetails>
        </PreviewAccordion>
      </ThemeProvider>,
    );

    expect(getByText('Details')).toBeTruthy();
  });
});
