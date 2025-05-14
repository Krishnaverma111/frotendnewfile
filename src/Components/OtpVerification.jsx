import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIURL } from "../GlobalURL";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "./ToastifyNotification";
import { FiMail } from "react-icons/fi";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";

const OTP_LENGTH = 4;
const RESEND_TIMEOUT = 30;

export default function OtpVerification() {
  const navigate = useNavigate();
  const { userId, type } = useParams();
  const email = localStorage.getItem("email");
  const inputRefs = useRef([]);

  const [code, setCode] = useState(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);

  const handleChange = useCallback((element, index) => {
    const value = element.value;
    if (!/^\d?$/.test(value)) return;
    setCode((prev) => {
      const newCode = [...prev];
      newCode[index] = value;
      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      return newCode;
    });
  }, []);

  const handleKeyDown = useCallback((e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [code]);

  const handleResendOTP = useCallback(async () => {
    try {
      setIsLoading(true);
      const endpoint =
        type === "UserOtp"
          ? "resendOtp"
          : type === "NewEmail"
          ? "resendEmailVerification"
          : "resendAdminOtp";
      await axios.post(`${APIURL}${endpoint}/${userId}`);
      showSuccessToast("OTP resent successfully!");
      setTimeLeft(RESEND_TIMEOUT);
      setCanResend(false);
    } catch (err) {
      showErrorToast(err.response?.data?.msg || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  }, [type, userId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const userOtp = code.join("");
        if (!userOtp || userOtp.length !== OTP_LENGTH) {
          showErrorToast("Please enter a valid 4-digit OTP.");
          return;
        }

        let endpoint;
        switch (type) {
          case "UserOtp":
            endpoint = `otpVerification/${userId}`;
            break;
          case "NewEmail":
            endpoint = `verifyUserEmail/${userId}`;
            break;
          case "AdminVerify":
            endpoint = `AdminOTPVerification/${userId}`;
            break;
          default:
            showErrorToast("Invalid verification type.");
            return;
        }

        const response = await axios.post(`${APIURL}${endpoint}`, { otp: userOtp });

        if (response.status === 200) {
          showSuccessToast(response.data?.msg || "Verification successful!");
          const redirectPath = type === "AdminVerify" ? "/adminhome" : "/login";
          navigate(redirectPath);
        }
      } catch (err) {
        showErrorToast(err.response?.data?.msg || "Failed to verify OTP");
      } finally {
        setIsLoading(false);
      }
    },
    [code, type, userId, navigate]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center p-4 relative">
      {/* Loading Spinner Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <PulseLoader color="#fff" size={12} />
        </div>
      )}

      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-[0_0_20px_rgba(255,0,0,0.4)] border border-red-500 z-10 overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-red-600 p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <FiMail className="text-red-600 text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wide select-none">
            OTP Verification
          </h1>
        </div>

        <div className="p-8">
          <p className="text-gray-700 text-center mb-6 text-sm select-none">
            Enter the {OTP_LENGTH}-digit code sent to <span className="font-bold text-red-600">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-14 h-14 text-center text-2xl font-bold text-red-600 border-2 border-red-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  disabled={isLoading}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <PulseLoader color="#fff" size={8} />
                  Verifying...
                </>
              ) : (
                "Start the Engine"
              )}
            </button>

            <div className="text-center text-sm text-gray-600">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-red-600 hover:text-red-700 font-semibold disabled:opacity-50"
                >
                  Resend Code
                </button>
              ) : (
                <p>
                  Resend in <span className="font-semibold text-red-500">{timeLeft}s</span>
                </p>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
