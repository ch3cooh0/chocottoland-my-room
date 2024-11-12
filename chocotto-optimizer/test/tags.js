export const Scale = {
    small: "small",
    medium: "medium",
    large: "large",
}
export const TestTags = {
    unit: "unit",
    integration: "integration",
    e2e: "e2e",
}

export function createTitle(title, scale, testTag) {
    return `${title} - testTag.${testTag} - scale.${scale}`;
}