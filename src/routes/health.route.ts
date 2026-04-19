import { Router } from "express";
import tls from "node:tls";

const router = Router();

router.get("/", (req, res) => {
  res.send({ ok: true, message: "API is runnign!" });
});

// Node version breaking example
router.get("/tls", (req, res) => {
  try {
    // This API is removed in Node 24
    const pair = (tls as any).createSecurePair();

    res.send({
      ok: true,
      message: "Legacy TLS API worked",
      exists: !!pair,
    });
  } catch (err: any) {
    res.status(500).send({
      ok: false,
      message: "Legacy TLS API failed",
      error: err.message,
    });
  }
});

/* import net from "node:net"; 
router.get("/modern-tls", async (req, res) => {
  try {
    const socket = net.connect(443, "example.com");

    const secureSocket = new tls.TLSSocket(socket, {});

    secureSocket.on("secureConnect", () => {
      res.send({
        ok: true,
        message: "Modern TLS connection established",
      });
      secureSocket.end();
    });

    secureSocket.on("error", (err) => {
      res.status(500).send({
        ok: false,
        message: "TLS connection failed",
        error: err.message,
      });
    });
  } catch (err: any) {
    res.status(500).send({
      ok: false,
      message: "Unexpected error",
      error: err.message,
    });
  }
});
*/
export default router;
