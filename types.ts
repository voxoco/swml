/**
 * Transfers the execution of the script to a new section, URL, or RELAY context (RELAY context currently not implemented). This is analogous to a "goto" operation.
 */
export type TransferStatement = {
  /**
   * Specifies where to transfer to. Required.
   * The value can be one of:
   * - `<label>` - section in the current document to jump to
   * - `relay:<relay context>` - relay context to notify (currently not implemented)
   * - `https://<URL>` - URL to fetch next document from. Sends HTTP POST
   */
  dest: string;

  /**
   * Named parameters to send to a section, URL, or context. Optional. Default is not set.
   */
  params?: {
    [key: string]: any;
  };

  /**
   * User data, ignored by SignalWire. Optional. Default is not set.
   */
  meta?: {
    [key: string]: any;
  };
};

/**
 * Execute a section or URL as a subroutine and return back to current document.
 */
export type ExecuteStatement = {
  /**
   * Executes a section or URL as a subroutine and returns back to the current document.
   * @param dest - Specifies the section or URL to execute. Required.
   * The value can be one of:
   * - `<label>` - section in the current document to execute
   * - `https://<URL>` - URL to fetch the next document from. Sends HTTP POST
   */
  dest: string;

  /**
   * @param params - Named parameters to send to the section or URL. Optional. Default is not set.
   */
  params?: {
    [key: string]: any;
  };

  /**
   * @param meta - User data, ignored by SignalWire. Optional. Default is not set.
   */
  meta?: {
    [key: string]: any;
  };
};

/**
 * Return from `execute` or exit script.
 */
export type ReturnStatement = {
  /**
   * Optional return value.
   */
  [key: string]: any;
};

/**
 * Send a `GET`, `POST`, `PUT`, or `DELETE` request to a remote URL.
 */
export type RequestStatement = {
  /**
   * URL to send the HTTPS request to. Required.
   */
  url: string;

  /**
   * Request type. GET|POST|PUT|DELETE. Required.
   */
  method: "GET" | "POST" | "PUT" | "DELETE";

  /**
   * Object containing HTTP headers to set. Optional. Default is not set.
   * Valid header values are `Accept`, `Authorization`, `Content-Type`, `Range`, and custom `X-` headers.
   */
  headers?: {
    [key: string]: string;
  };

  /**
   * Request body. `Content-Type` header should be explicitly set, but if not set, the most likely type will be set based on the first non-whitespace character. Optional. Default is not set.
   */
  body?: string | {
    [key: string]: string;
  };

  /**
   * Maximum time in seconds to wait for a response. Default is 5.0. Optional.
   */
  timeout?: number;

  /**
   * Maximum time in seconds to wait for a connection. Default is 5.0. Optional.
   */
  connect_timeout?: number;

  /**
   * Store parsed JSON response as variables. Default is false. Optional.
   */
  save_variables?: boolean;
};

/**
 * Execute a sequence of instructions depending on which value matches a variable.
 */
export type SwitchStatement = {
  /**
   * Name of the variable whose value needs to be compared. Required.
   */
  variable: string;

  /**
   * Object of values mapped to array of instructions to execute. Optional. Default is not set.
   */
  case?: {
    [value: string]: any[];
  };

  /**
   * Optional array of instructions to execute if no cases match. Optional. Default is not set.
   */
  default?: any[];
};

/**
 * Execute a sequence of instructions depending on the value of a JavaScript condition.
 */
export type CondStatement = {
  /**
   * The JavaScript condition to act on. Required.
   */
  when: string;

  /**
   * Sequence of instructions to execute when the condition evaluates to true. Required.
   */
  then: Array<any>;

  /**
   * Sequence of instructions to execute when the condition evaluates to false. Required.
   */
  else: Array<any>;
};

/**
 * Set script variables to the specified values.
 */
type SetStatement = {
  /**
   * Accepts an object mapping variable names to values.
   */
  [variable: string]: any;
};

/**
 * Unset the specified variables
 */
type UnsetStatement = {
  /**
   * Names of the variables to unset.
   */
  vars: string | string[];
};

/**
 * Answer the call and set an optional maximum duration.
 */
type AnswerMethod = {
  /**
   * Maximum duration in seconds. Optional.
   * Can not be less than 7 seconds. Default is 14100 seconds (4 hours).
   */
  max_duration?: number;
};

/**
 * End the call with an optional reason.
 */
type HangupMethod = {
  /**
   * Hangup reason, optional.
   * Valid values are `hangup`, `busy`, or `decline`.
   */
  reason: "hangup" | "busy" | "decline";
};

/**
 * Play a prompt and wait for digit or speech input. Speech detection is not enabled unless at least one speech parameter is set.
 * If only speech parameters are set (and no digit parameters), digit detection is not enabled.
 * To enable both digit and speech detection, set at least one parameter for each.
 */
type PromptMethod = {
  /**
   * URL or array of URLs to play. Required.
   * Allowed URLs are:
   * - `http://` - audio file to GET
   * - `https://` - audio file to GET
   * - `ring:[duration:]<country code>` - ring tone to play. For example: ring:us to play single ring or ring:20.0:us to play ring for 20 seconds.
   * - `say:<text to speak>` - Sentence to say
   * - `silence:<duration>` - seconds of silence to play
   */
  play: string | string[];

  /**
   * Optional volume gain to apply to played URLs. Default is 0.
   */
  volume?: number;

  /**
   * Optional voice to use for text to speech. Default is Polly.Salli.
   */
  say_voice?: string;

  /**
   * Optional language to use for text to speech. Default is `en-US`.
   */
  say_language?: string;

  /**
   * Optional gender to use for text to speech. Default is `female`.
   */
  say_gender?: string;

  /**
   * Optional number of digits to collect. Default is `1`.
   */
  max_digits?: number;

  /**
   * Optional digits that terminate digit collection. Default is unset.
   */
  terminators?: string;

  /**
   * Optional time in seconds to wait for next digit. Default is `5.0`.
   */
  digit_timeout?: number;

  /**
   * Optional time in seconds to wait for start of input. Default is `5.0`.
   */
  initial_timeout?: number;

  /**
   * Optional max time in seconds to wait for speech result. Default is `unset`.
   */
  speech_timeout?: number;

  /**
   * Optional time in seconds to wait for end of speech utterance. Default is `unset`.
   */
  speech_end_timeout?: number;

  /**
   * Optional language to detect speech in.
   */
  speech_language?: string;

  /**
   * Optional expected words to match.
   */
  speech_hints?: string[];
};

/**
 * Plays file(s), ringtones, speech, or silence.
 */
type PlayMethod = {
  /**
   * URL or array of URLs to play. Required. Allowed URLs are:
   * `http://` - audio file to GET
   * `https://` - audio file to GET
   * `ring:[duration:]<country code>` - ring tone to play
   * `say:<text to speak>` - Sentence to say
   * `silence:<duration>` - seconds of silence to play
   */
  urls?: string[];
  url: string;

  /**
   * Optional volume gain to apply to played URLs. Allowed values from `-40.0` to `40.0`. Default `0`.
   */
  volume?: number;

  /**
   * Optional voice to use for text to speech. Default is `Polly.Salli`.
   */
  say_voice?: string;

  /**
   * Optional language to use for text to speech. Default is `en-US`.
   */
  say_language?: string;

  /**
   * Optional gender to use for text to speech. Default is `female`.
   */
  say_gender?: string;
};

/**
 * Records the call audio in foreground, e.g. to record voicemails.
 */
type RecordMethod = {
  /**
   * Whether to record in stereo mode. Optional. Default `false`.
   */
  stereo?: boolean;

  /**
   * Optional format (`wav` or `mp3`). Default `wav`.
   */
  format?: string;

  /**
   * Optional direction of the audio to record: `speak` for what party says, `hear` for what party hears. Default `speak`.
   */
  direction?: string;

  /**
   * Optional string of digits that will stop the recording when pressed. Default `#`.
   */
  terminators?: string;

  /**
   * Whether to play a beep before recording. Optional. Default `false`.
   */
  beep?: boolean;

  /**
   * How sensitive the recording voice activity detector is to background noise. A larger value is more sensitive. Allowed values from 0.0 to 100.0. Optional. Default 44.0.
   */
  input_sensitivity?: number;

  /**
   * How long, in seconds, to wait for speech to start. Optional. Default `0`.
   */
  initial_timeout?: number;

  /**
   * How much silence, in seconds, will end the recording. Optional. Default `0`.
   */
  end_silence_timeout?: number;
};

/**
 * Starts a recording of a call in the background.
 */
type RecordCallMethod = {
  /**
   * Optional identifier for this recording, to use with `stop_call_record`. Default is generated and saved to `record_control_id` variable.
   */
  control_id?: string;

  /**
   * Whether to record in stereo mode. Optional. Default `false`.
   */
  stereo?: boolean;

  /**
   * Optional format (`wav` or `mp3`). Default `wav`.
   */
  format?: string;

  /**
   * Optional direction of the audio to record: `speak` for what party says, `hear` for what party hears, `both` for what the party hears and says. Default `both`.
   */
  direction?: string;

  /**
   * Optional string of digits that will stop the recording when pressed. Default is unset.
   */
  terminators?: string;

  /**
   * Whether to play a beep before recording. Optional. Default false.
   */
  beep?: boolean;

  /**
   * How sensitive the recording voice activity detector is to background noise. A larger value is more sensitive. Allowed values from `0.0` to `100.0`. Optional. Default `44.0`.
   */
  input_sensitivity?: number;

  /**
   * How long, in seconds, to wait for speech to start. Optional. Default `0`.
   */
  initial_timeout?: number;

  /**
   * How much silence, in seconds, will end the recording. Optional. Default `0`.
   */
  end_silence_timeout?: number;
};

/**
 * Stop an active background recording.
 */
type StopRecordCallMethod = {
  /**
   * Optional identifier for the recording to stop.
   * If not set, the last recording started will be stopped.
   * Default is not set.
   */
  control_id?: string;
};

/**
 * Joins a RELAY room.
 */
type JoinRoomMethod = {
  /**
   * Required. Name of the room to join.
   */
  name: string;
};

/**
 * Denoise Method Result
 */
type DenoiseResult = {
  /**
   * Output result of the denoise method which can be `on` or `failed`.
   */
  denoise_result: "on" | "failed";
};

/**
 * Stops noise reduction.
 */
type StopDenoiseMethod = {
  /**
   * Denoise result output. Fixed value: `off`
   */
  denoise_result: "off";
};

/**
 * Sends a fax
 */
type SendFaxMethod = {
  /**
   * Required URL to the PDF document to fax.
   */
  document: string;

  /**
   * Optional text to add to the fax header. Default is not set.
   */
  header_info?: string;

  /**
   * Optional station identity to report. Default is the caller ID number.
   */
  identity?: string;
};

/**
 * Send SIP REFER to a SIP call.
 */
type SipReferMethod = {
  /**
   * The SIP URI to REFER to. Required.
   */
  to_uri: string;
};

type serialParallel = {
  /**
   * Array of arrays. Inner arrays contain destinations to dial simultaneously. Outer array attempts each parallel group in order.
   */
  serial_parallel: string[][];
};

type serial = {
  /**
   * Array of destinations to dial in order.
   */
  serial: string[];
};

type parallel = {
  /**
   * Array of destinations to dial simultaneously.
   */
  parallel: string[];
};

type to = {
  /**
   * Single destination to dial.
   */
  to: string;
};

/**
 * Dial a SIP URI or phone number.
 */
interface ConnectMethodBase {
  /**
   * Caller ID number. Optional. Default is calling party caller ID number.
   */
  from?: string;

  /**
   * Custom SIP headers to add to INVITE. Has no effect on calls to phone numbers. Optional. Default is not set.
   */
  headers?: {
    [key: string]: any;
  };

  /**
   * Comma-separated string of codecs to offer. Has no effect on calls to phone numbers. Optional. Default is set based on SignalWire settings.
   */
  codecs?: string;

  /**
   * If true, WebRTC media is offered to the SIP endpoint. Has no effect on calls to phone numbers. Optional. Default is false.
   */
  webrtc_media?: boolean;

  /**
   * Time, in seconds, to set the SIP Session-Expires header in INVITE. Must be a positive, non-zero number. Has no effect on calls to phone numbers. Optional. Default is set based on SignalWire settings.
   */
  session_timeout?: number;

  /**
   * Array of play URIs to play as ringback tone. Optional. Default will play audio from the provider.
   */
  ringback?: string[];
}

type ConnectMethodTo = ConnectMethodBase & to;
type ConnectMethodSerial = ConnectMethodBase & serial;
type ConnectMethodParallel = ConnectMethodBase & parallel;
type ConnectMethodSerialParallel = ConnectMethodBase & serialParallel;

// ConnectMethod should have one and only one of the following dialing parameters set.
type ConnectMethod =
  | ConnectMethodTo
  | ConnectMethodSerial
  | ConnectMethodParallel
  | ConnectMethodSerialParallel;

/**
 * Initiates a background call tap. Media is streamed over Websocket or RTP to a specified URI.
 */
type TapMethod = {
  /**
   * The destination of the tap media stream. Required.
   * The value can be one of:
   * - `rtp://<IP:port>`
   * - `ws://<URL>`
   * - `wss://<URL>`
   */
  uri: string;

  /**
   * Identifier for this tap to use with stop_tap. Optional.
   * If not provided, one will be generated and stored in the tap_control_id variable.
   */
  control_id?: string;

  /**
   * Direction of the audio to tap. Optional. Default is "both".
   * The value can be one of:
   * - `speak` for what party says
   * - `hear` for what party hears
   * - `both` for what party hears and says
   */
  direction?: string;

  /**
   * Codec for the audio. Optional. Default is `PCMU`.
   * The value can be `PCMU` or `PCMA`.
   */
  codec?: string;

  /**
   * Packetization time of the media in milliseconds. Optional.
   * Only applicable if using an RTP URI.
   * Default is 20 ms.
   */
  rtp_ptime?: number;
};

/**
 * Stops an active tap stream.
 */
type StopTapMethod = {
  /**
   * Control ID of the tap to stop. Optional.
   * If not set, the last tap started will be stopped.
   */
  control_id?: string;
};

/**
 * Send digit presses as DTMF tones.
 */
type SendDigitsMethod = {
  /**
   * The digits to send. Required. Valid values are 0123456789*#ABCDWw. Character W is a 1 second delay, and w is a 500 ms delay.
   */
  digits: string;
};

/**
 * Sends an outbound message to a PSTN phone number.
 */
type SendSmsMethod = {
  /**
   * Phone number to send SMS message to in e.164 format. Required.
   */
  to_number: string;

  /**
   * Phone number SMS message will be sent from. Required.
   */
  from_number: string;

  /**
   * Body of the message. Required unless media is included.
   */
  body?: string;

  /**
   * Array of media URLs to include in the message. Required unless body is included.
   */
  media?: string[];

  /**
   * Region of the world to originate the message from.
   * A default is picked based on account preferences or device location. Optional.
   */
  region?: string;

  /**
   * Array of tags to associate with the message to facilitate log searches. Optional.
   */
  tags?: string[];
};

/**
 * Connect to an AI Agent.
 */
type AiMethod = {
  /**
   * TTS engine the AI agent will use. Optional. Default is picked by SignalWire.
   */
  engine?: string;

  /**
   * TTS voice the AI agent will use. Optional. Default is picked by SignalWire.
   */
  voice?: string;

  /**
   * The initial set of instructions and settings to configure the agent. Optional. Default is not set.
   */
  prompt?: {
    text?: string;
    temperature?: number;
    top_p?: number;
    confidence?: number;
    barge_confidence?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
  };

  /**
   * The final set of instructions and configuration settings to send to the agent. Optional. Default is not set.
   */
  post_prompt?: {
    text?: string;
    temperature?: number;
    top_p?: number;
    confidence?: number;
    barge_confidence?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
  };

  /**
   * URL to send status callbacks and reports to. Optional. Default is not set.
   */
  post_prompt_url?: string;

  /**
   * Auth username for post_url endpoint. Optional. Default is not set.
   */
  post_prompt_auth_user?: string;

  /**
   * Auth password for post_url endpoint. Optional. Default is not set.
   */
  post_prompt_auth_password?: string;

  /**
   * Experimental parameters (sms, background audio, attention_timeout, ect.). Optional. Default is not set.
   */
  params?: {
    [key: string]: any;
  };

  /**
   * An array of JSON objects to create user-defined functions/endpoints that can be executed during the dialogue. Optional. Default is not set.
   */
  SWAIG?: {
    defaults?: {
      web_hook_url?: string;
      web_hook_auth_user?: string;
      web_hook_auth_pass?: string;
      meta_data?: {
        [key: string]: any;
      };
    };
    functions?: {
      function: string;
      purpose: string;
      argument: string;
      web_hook_url?: string;
      web_hook_auth_user?: string;
      web_hook_auth_pass?: string;
    }[];
  };

  /**
   * An array of hints (as strings) to provide context to the dialogue. Optional. Default is not set.
   */
  hints?: string[];

  /**
   * An array of JSON objects defining supported languages in the conversation. Optional. Default is `en-us`.
   */
  languages?: {
    name?: string;
    code?: string;
    voice?: string;
  }[];
};

export interface Statements {
  transfer?: TransferStatement;
  execute?: ExecuteStatement;
  return?: ReturnStatement;
  request?: RequestStatement;
  switch?: SwitchStatement;
  cond?: CondStatement[];
  set?: SetStatement;
  unset?: UnsetStatement;
}

export interface Methods {
  answer?: number | AnswerMethod;
  hangup?: "hangup" | "busy" | "decline" | HangupMethod;
  prompt?: PromptMethod;
  play?: PlayMethod;
  record?: RecordMethod;
  record_call?: RecordCallMethod;
  stop_record_call?: StopRecordCallMethod;
  join_room?: JoinRoomMethod;
  denoise?: DenoiseResult;
  stop_denoise?: StopDenoiseMethod;
  receive_fax?: string;
  send_fax?: SendFaxMethod;
  sip_refer?: SipReferMethod;
  connect?: ConnectMethod;
  tap?: TapMethod;
  stop_tap?: StopTapMethod;
  send_digits?: SendDigitsMethod;
  send_sms?: SendSmsMethod;
  ai?: AiMethod;
}

export type StatementsAndMethods = Array<
  | Statements
  | Methods
  | "hangup"
  | "answer"
  | "stop_record_call"
  | "denoise"
  | "stop_denoise"
  | "receive_fax"
  | "stop_tap"
>;

export interface Swml {
  sections: {
    main: StatementsAndMethods;
    [key: string]: StatementsAndMethods;
  };
}
