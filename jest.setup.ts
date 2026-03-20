import 'dotenv/config'
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
// @ts-expect-error type
global.TextDecoder = TextDecoder
