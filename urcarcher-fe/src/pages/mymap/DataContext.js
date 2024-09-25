//사용 X 
const { createContext,  useState, useContext } = require("react");

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [categoryList, setCategoryList] = useState([]);

    return (
        <DataContext.Provider value={{ categoryList, setCategoryList }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);