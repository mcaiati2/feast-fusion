import { 
    useState, 
    useEffect, 
    useContext, 
    createContext, 
    ReactNode, 
    Dispatch, 
    SetStateAction 
  } from 'react';
  import axios from 'axios';
  
  interface Category {
    id?: number;
    name?: string;
    address?: string;
    created_at?: Date;
    updated_at?: Date;
  }
  
  interface User {
    id?: number;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    email?: string;
    created_at?: Date;
    updated_at?: Date;
    category?: Category[]
  }
  
  interface State {
    user: User | null;
    loading: boolean;
  }
  
  interface StoreContextType {
    state: State;
    setState: Dispatch<SetStateAction<State>>;
  }
  
  const StoreContext = createContext<StoreContextType | undefined>(undefined);
  
  const initialState: State = {
    user: null,
    loading: true
  };
  
  
  export function StoreProvider(props: {children: ReactNode}) {
    const [state, setState] = useState(initialState);
    
    useEffect(() => {
      axios.get('/auth/user')
        .then(res => {
          setState({
            ...state,
            user: res.data.user,
            loading: false
          });
        });
    }, [])
  
    return (
      <StoreContext.Provider value={{
        state,
        setState
      }}>
        {props.children}
      </StoreContext.Provider>
    )
  }
  
  export const useStore = () => useContext(StoreContext);
  
  