import { AnimationItem } from "lottie-web";
import { MutableRefObject, Ref, } from "react";

export type AnimationConfig = {
	name: string,
	container: MutableRefObject<HTMLDivElement>,
	data: any,
};