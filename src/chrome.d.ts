declare namespace chrome {
  export namespace runtime {
    export function sendMessage(message: any, callback?: (response: any) => void): void
    export const onMessage: {
      addListener(callback: (message: any, sender: any, sendResponse: (response: any) => void) => boolean | void): void
    }
  }
  
  export namespace storage {
    export namespace local {
      export function get(keys: string[], callback: (result: any) => void): void
      export function set(items: object, callback?: () => void): void
    }
  }
}