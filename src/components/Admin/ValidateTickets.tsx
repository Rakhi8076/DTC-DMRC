import { useState } from 'react';
import { QrCode, Search, CheckCircle, XCircle, Ticket } from 'lucide-react';

export function ValidateTickets() {
  const [qrCode, setQrCode] = useState('');
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    message: string;
    details?: any;
  } | null>(null);

  const handleValidate = () => {
    if (!qrCode.trim()) {
      setValidationResult({
        success: false,
        message: 'Please enter a QR code',
      });
      return;
    }

    const isValid = Math.random() > 0.3;

    if (isValid) {
      setValidationResult({
        success: true,
        message: 'Ticket/Pass is valid',
        details: {
          type: qrCode.includes('PASS') ? 'Pass' : 'Ticket',
          holder: 'John Doe',
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        },
      });
    } else {
      setValidationResult({
        success: false,
        message: 'Invalid or expired ticket/pass',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Validate Tickets & Passes</h2>
        <p className="text-gray-600">Scan and validate passenger tickets and passes</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode size={48} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Scan QR Code</h3>
            <p className="text-gray-600">Enter the QR code to validate</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={qrCode}
                  onChange={(e) => {
                    setQrCode(e.target.value);
                    setValidationResult(null);
                  }}
                  placeholder="Enter QR code (e.g., QR-1234567890-abc123)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleValidate()}
                />
              </div>
            </div>

            <button
              onClick={handleValidate}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Validate
            </button>
          </div>

          {validationResult && (
            <div
              className={`mt-6 rounded-xl p-6 border-2 ${
                validationResult.success
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start gap-4">
                {validationResult.success ? (
                  <CheckCircle size={32} className="text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle size={32} className="text-red-600 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h4
                    className={`font-bold text-lg mb-2 ${
                      validationResult.success ? 'text-green-900' : 'text-red-900'
                    }`}
                  >
                    {validationResult.message}
                  </h4>
                  {validationResult.success && validationResult.details && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-700 font-semibold">Type:</span>
                        <span className="text-green-900">{validationResult.details.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-700 font-semibold">Holder:</span>
                        <span className="text-green-900">{validationResult.details.holder}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-700 font-semibold">Valid Until:</span>
                        <span className="text-green-900">
                          {validationResult.details.validUntil}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Ticket size={32} className="mx-auto text-blue-600 mb-3" />
            <p className="text-3xl font-bold text-gray-900">247</p>
            <p className="text-sm text-gray-600">Validated Today</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <CheckCircle size={32} className="mx-auto text-green-600 mb-3" />
            <p className="text-3xl font-bold text-gray-900">98%</p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <XCircle size={32} className="mx-auto text-red-600 mb-3" />
            <p className="text-3xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-600">Invalid Today</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-3">Validation Instructions</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Scan the QR code using your device camera or enter it manually</li>
          <li>• Green indicator means the ticket/pass is valid for travel</li>
          <li>• Red indicator means the ticket/pass is invalid or expired</li>
          <li>• Report any suspicious or tampered tickets immediately</li>
        </ul>
      </div>
    </div>
  );
}
