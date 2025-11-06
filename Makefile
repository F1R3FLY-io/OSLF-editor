.PHONY: init_editor, init_playground, init

dev:
	cd playground && \
	pnpx serve .
