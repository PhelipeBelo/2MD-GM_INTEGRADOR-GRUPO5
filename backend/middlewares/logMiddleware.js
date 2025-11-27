import { create } from '../config/database.js';

// Middleware para registrar logs de acesso
export const logMiddleware = async (req, res, next) => {
    const startTime = Date.now();
    let logRegistrado = false; 

    // 1. Preparar dados iniciais com segurança contra UNDEFINED
    const logData = {
        rota: req.originalUrl,
        metodo: req.method,
        ip_address: (req.ip || req.connection.remoteAddress || req.socket.remoteAddress) || null,
        user_agent: req.get('User-Agent') || null,
        

        _dados_requisicao_obj: {
            headers: {
                'content-type': req.get('Content-Type') || null,
                'authorization': req.get('Authorization') ? 'Bearer [REDACTED]' : null,
            },
            body: req.method !== 'GET' ? sanitizeRequestBody(req.body) : null,
            query: Object.keys(req.query).length > 0 ? req.query : null
        }
    };

    const finalizarLog = (data, isJson = false) => {
        if (logRegistrado) return; 
        logRegistrado = true;

        let dadosRespostaObj = null;

        if (res.statusCode >= 400) {
            let message = data;
            if (!isJson && typeof data === 'string' && data.startsWith('{')) {
                try { message = JSON.parse(data); } catch(e) {}
            }
            dadosRespostaObj = {
                error: true,
                status: res.statusCode,
                message: typeof message === 'object' ? message : String(message).substring(0, 500)
            };
        }

        // 2. Montar objeto final GARANTINDO TIPOS COMPATÍVEIS COM MYSQL
        const finalLogData = {
            rota: logData.rota,
            metodo: logData.metodo,
            ip_address: logData.ip_address,
            user_agent: logData.user_agent,
            

            dados_requisicao: JSON.stringify(logData._dados_requisicao_obj),
            
            status_code: res.statusCode,
            tempo_resposta_ms: Date.now() - startTime,
            

            gl_id: (req.usuario && req.usuario.id) ? req.usuario.id : null,
            

            dados_resposta: dadosRespostaObj ? JSON.stringify(dadosRespostaObj) : null
        };

        saveLog(finalLogData).catch(err => console.error('Erro silencioso no log:', err));
    };

    const originalJson = res.json;
    res.json = function(data) {
        finalizarLog(data, true);
        return originalJson.call(this, data);
    };

    const originalSend = res.send;
    res.send = function(data) {
        finalizarLog(data, false);
        return originalSend.call(this, data);
    };

    next();
};


function sanitizeRequestBody(body) {
    if (!body || typeof body !== 'object') return body;
    try {
        const sanitized = JSON.parse(JSON.stringify(body));
        const sensitiveFields = ['senha', 'password', 'token', 'authorization', 'confirmarsenha'];
        const clean = (obj) => {
            Object.keys(obj).forEach(key => {
                if (sensitiveFields.includes(key.toLowerCase())) {
                    obj[key] = '[REDACTED]';
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    clean(obj[key]);
                }
            });
        };
        clean(sanitized);
        return sanitized;
    } catch (e) {
        return {};
    }
}

async function saveLog(logData) {

    await create('logs', logData);
}

export const simpleLogMiddleware = (req, res, next) => {

    next();
};