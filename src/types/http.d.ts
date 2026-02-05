import "http";

declare module "http" {
  interface IncomingMessage {
    session: Record<string, any>
  }
}
