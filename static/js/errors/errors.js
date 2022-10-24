
const wrapper = (text) => "ApEngine: " + text + "!";

export const SCENE_NOT_FOUND = wrapper("Scene does not found!");

export const UNDEFINED_ITEM_TYPE = wrapper("Undefined item type! Existing type: 'box', 'ball'")

export const itemAlreadyExist = (itemName) => wrapper(`${itemName} already exist in this game!`)

export const STATE_IS_NOT_USE = wrapper("State is not use");
