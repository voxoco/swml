import { Methods, Statements, Swml } from "./types.ts";

export class SwmlBuilder {
  private response = {} as Swml;

  constructor() {
    this.response = {
      sections: {
        main: [],
      },
    };
  }

  get() {
    return this.response;
  }

  /**
   * Transfers the execution of the script to a new section, URL, or RELAY context (RELAY context currently not implemented). This is analogous to a "goto" operation.
   */
  transfer(obj: Statements["transfer"]) {
    this.response.sections.main.push({
      transfer: obj,
    });

    return this.response;
  }

  /**
   * Execute a section or URL as a subroutine and return back to current document.
   */
  execute(obj: Statements["execute"]) {
    this.response.sections.main.push({
      execute: obj,
    });

    return this.response;
  }

  /**
   * Return from `execute` or exit script.
   */
  return(obj: Statements["return"]) {
    this.response.sections.main.push({
      return: obj,
    });

    return this.response;
  }

  /**
   * Send a `GET`, `POST`, `PUT`, or `DELETE` request to a remote URL.
   */
  request(obj: Statements["request"]) {
    this.response.sections.main.push({
      request: obj,
    });

    return this.response;
  }

  /**
   * Execute a sequence of instructions depending on which value matches a variable.
   */
  switch(obj: Statements["switch"]) {
    this.response.sections.main.push({
      switch: obj,
    });

    return this.response;
  }

  /**
   * Execute a sequence of instructions depending on the value of a JavaScript condition.
   */
  cond(obj: Statements["cond"]) {
    this.response.sections.main.push({
      cond: obj,
    });

    return this.response;
  }

  /**
   * Set script variables to the specified values.
   */
  set(obj: Statements["set"]) {
    this.response.sections.main.push({
      set: obj,
    });

    return this.response;
  }

  /**
   * Unset the specified variables
   */
  unset(obj: Statements["unset"]) {
    this.response.sections.main.push({
      unset: obj,
    });

    return this.response;
  }

  /**
   * Answer the call and set an optional maximum duration.
   */
  answer(obj?: Methods["answer"]) {
    if (obj) {
      this.response.sections.main.push({
        answer: obj,
      });

      return this.response;
    }

    this.response.sections.main.push("answer");

    return this.response;
  }

  /**
   * End the call with an optional reason.
   */
  hangup(reason?: Methods["hangup"], obj?: Methods["hangup"]) {
    if (reason) {
      this.response.sections.main.push({
        hangup: reason,
      });

      return this.response;
    }

    if (obj) {
      this.response.sections.main.push({
        hangup: obj,
      });

      return this.response;
    }

    this.response.sections.main.push("hangup");

    return this.response;
  }

  /**
   * Play a prompt and wait for digit or speech input. Speech detection is not enabled unless at least one speech parameter is set. If only speech parameters are set (and no `digit` parameters), digit detection is not enabled. To enable both digit and speech detection, set at least one parameter for each.
   */
  prompt(obj: Methods["prompt"]) {
    this.response.sections.main.push({
      prompt: obj,
    });

    return this.response;
  }

  /**
   * Play file(s), ringtones, speech or silence.
   */
  play(obj: Methods["play"]) {
    this.response.sections.main.push({
      play: obj,
    });

    return this.response;
  }

  /**
   * Record the call audio in the foreground. Use this, for example, to record voicemails.
   */
  record(obj: Methods["record"]) {
    this.response.sections.main.push({
      record: obj,
    });

    return this.response;
  }

  /**
   * Record call in the background.
   */
  recordCall(obj: Methods["record_call"]) {
    this.response.sections.main.push({
      record_call: obj,
    });

    return this.response;
  }

  /**
   * Stop an active background recording.
   */
  stopRecordCall(obj?: Methods["stop_record_call"]) {
    if (obj) {
      this.response.sections.main.push({
        stop_record_call: obj,
      });

      return this.response;
    }

    this.response.sections.main.push("stop_record_call");

    return this.response;
  }

  /**
   * Join a RELAY room.
   */
  joinRoom(obj: Methods["join_room"]) {
    this.response.sections.main.push({
      join_room: obj,
    });

    return this.response;
  }

  /**
   * Start noise reduction.
   */
  denoise(obj?: Methods["denoise"]) {
    if (obj) {
      this.response.sections.main.push({
        denoise: obj,
      });

      return this.response;
    }

    this.response.sections.main.push("denoise");

    return this.response;
  }

  /**
   * Stop noise reduction.
   */
  stopDenoise(obj?: Methods["stop_denoise"]) {
    if (obj) {
      this.response.sections.main.push({
        stop_denoise: obj,
      });

      return this.response;
    }

    this.response.sections.main.push("stop_denoise");

    return this.response;
  }

  /**
   * Receive a fax being delivered to this call.
   */
  receiveFax(obj?: Methods["receive_fax"]) {
    if (obj) {
      this.response.sections.main.push({
        receive_fax: obj,
      });

      return this.response;
    }

    this.response.sections.main.push("receive_fax");

    return this.response;
  }

  /**
   * Send a fax
   */
  sendFax(obj: Methods["send_fax"]) {
    this.response.sections.main.push({
      send_fax: obj,
    });

    return this.response;
  }

  /**
   * Send SIP REFER to a SIP call.
   */
  refer(obj: Methods["sip_refer"]) {
    this.response.sections.main.push({
      sip_refer: obj,
    });

    return this.response;
  }

  /**
   * Dial a SIP URI or phone number.
   */
  connect(obj: Methods["connect"]) {
    this.response.sections.main.push({
      connect: obj,
    });

    return this.response;
  }

  /**
   * Start background call tap. Media is streamed over Websocket or RTP to customer controlled URI.
   */
  tap(obj: Methods["tap"]) {
    this.response.sections.main.push({
      tap: obj,
    });

    return this.response;
  }

  /**
   * Stop an active tap stream.
   */
  stopTap(obj?: Methods["stop_tap"]) {
    if (obj) {
      this.response.sections.main.push({
        stop_tap: obj,
      });

      return this.response;
    }

    this.response.sections.main.push("stop_tap");

    return this.response;
  }

  /**
   * Send digit presses as DTMF tones.
   */
  sendDigits(obj: Methods["send_digits"]) {
    this.response.sections.main.push({
      send_digits: obj,
    });

    return this.response;
  }

  /**
   * Send an outbound message to a PSTN phone number.
   */
  sendSms(obj: Methods["send_sms"]) {
    this.response.sections.main.push({
      send_sms: obj,
    });

    return this.response;
  }

  /**
   * Connect to an AI Agent.
   */
  ai(obj: Methods["ai"]) {
    this.response.sections.main.push({
      ai: obj,
    });

    return this.response;
  }

  /**
   * Subroutine to execute.
   * 
   * The `execute` method provides a mechanism for calling subroutines. A subroutine is implemented as a section in the document that can optionally accept named parameters and return a result or can be hosted by a server.
   * 
   * The subroutine may optionally be implemented as an object with `meta` and `code` fields to add user-defined data and the code to execute, respectively.
   */
  subroutine(name: string, obj: any): Swml {
    this.response.sections[name] = obj;

    return this.response;
  }
}
