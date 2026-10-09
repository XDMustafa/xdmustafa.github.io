// The icon package's root entry bundles all 6,000+ icons (~6 MB) and does not
// tree-shake. Vite and tsc alias "@devigner-ui/icons" here, so the components
// in ui/ stay untouched and only the icons they use are shipped.
export { IconCheckCircle } from "@devigner-ui/icons/CheckCircle";
export { IconClose } from "@devigner-ui/icons/Close";
export { IconCloseCircle } from "@devigner-ui/icons/CloseCircle";
export { IconCopy } from "@devigner-ui/icons/Copy";
export { IconSpinner } from "@devigner-ui/icons/Spinner";
