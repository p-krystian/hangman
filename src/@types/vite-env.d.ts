/// <reference types="vite-plugin-svgr/client" />

declare const __APP_VERSION__: string | undefined;

declare type ComponentSVGR = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
  }
>;
