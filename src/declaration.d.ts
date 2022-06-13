// declaration.d.ts
declare module "*.module.css";

declare module "*.png" {
	const value: any;
	export = value;
}
