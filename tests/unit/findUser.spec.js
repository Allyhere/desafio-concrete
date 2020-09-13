import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import SearchBar from "@/components/SearchBar.vue";
import SearchNotFound from "@/components/SearchNotFound.vue";
import SearchResults from "@/components/SearchResults.vue";

describe("SearchBar", () => {
  const wrapper = mount(Home);
  const search = mount(SearchBar);
  test("If profile request is 404, then Home loads SearchNotFound", () => {
    const input = search.find(".search__bar");
    input.value = "ashduiashdas";
    search.find(".search__btn").trigger("click");
    expect(wrapper.findComponent(SearchNotFound).exists()).toBe(true);
  });
  test("If profile request is Successfull, then Home loads SearchResults", () => {
    const input = search.find(".search__bar");
    input.value = "allyhere";
    search.find(".search__btn").trigger("click");
    expect(wrapper.find(SearchResults).exists()).toBeTruthy();
  });
});
