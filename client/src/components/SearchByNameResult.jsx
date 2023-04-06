import { useAtom } from "jotai";
import state from "./AtomStates";
import { searchByBarcode } from "./Utils";

export default function SearchByNameResult() {
  const [searchNames, setSearchNames] = useAtom(state.searchNames);
  const [product, setProduct] = useAtom(state.product);

  return (
    searchNames && (
      <div className="list-container">
        {searchNames.map((item, index) => (
          <div
            className="product-names"
            key={index}
            onClick={() =>
              searchByBarcode(false, setSearchNames, setProduct, item.fdcId)
            }
          >
            {index + 1}.{item["description"]}
          </div>
        ))}
      </div>
    )
  );
}
