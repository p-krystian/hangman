import { useState, useEffect } from 'react';
import localStorage from '@/Utils/localStorage';

function useLocalStorage<T>(initValue: T, key: string, parser: (data: unknown) => T) {
  const [val, setVal] = useState<T>(() => localStorage.read(key, parser, initValue));

  useEffect(() => {
    localStorage.save(key, val);
  }, [key, val]);

  useEffect(() => {
    const prefixedKey = localStorage.getPrefixedKey(key);

    function onStorage(e: StorageEvent) {
      if (e.key === prefixedKey) {
        setVal(localStorage.read(key, parser, initValue));
      }
    }

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, parser, initValue]);

  return [val, setVal] as [T, React.Dispatch<React.SetStateAction<T>>];
}

export default useLocalStorage;
